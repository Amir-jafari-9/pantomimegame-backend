const { clearRepeated } = require("../Utilities/clearRepeated");
const getRandomWordQuery = require("../database/getRandomWordQuery");
const CustomAPIError = require("../errors/custom-error");
const categoryName = require("../helpers/categoryName");
const scoreList = require("../helpers/scorelist");

const Game = require("../models/game");
const WordModel = require("../models/word");
const fetchWordSchema = require("../validators/fetchWord");

const fetchRandomWord = async (req, res) => {
    // check result of validate
    let {
        value: { category, level, game, status },
        error
    } = fetchWordSchema.validate(req.query);
    if (error)
        throw new CustomAPIError(error.toString().replace("Error: ", ""), 422);

    // for golden question
    if (category !== "TG" && level !== "1" && level !== "2" && level !== "3")
        throw new CustomAPIError(
            "for none 'TG' category please select between 1 , 2, 3 ",
            404
        );
    if (category === "TG") level = "4";

    const match = await Game.findById(game);
    if (!match) {
        throw new CustomAPIError("game not found", 404);
    }

    // store some value for better access
    const roundCount = match.round; // 0
    const currentRoundDetail = match.roundsDetail[roundCount];
    const gameGroups = match.groups;
    const stepCount = match.stepCount; // 0
    const currentStepDetail = currentRoundDetail.stepDetail[stepCount];

    const [randomWord] = await WordModel.aggregate(
        getRandomWordQuery(category, match._id, level)
    );

    if (!randomWord) {
        throw new CustomAPIError("No data found", 404);
    }

    match.repeatedWords.push(randomWord._id);

    if (status === "new") {
        currentRoundDetail.status = "running";
        currentRoundDetail.stepDetail.push({
            stepSetting: {
                category,
                level,
                wordPoints: scoreList[randomWord.level]
            },
            group: gameGroups[stepCount]._id,
            // player: "plyer._id",
            words: [{ wordId: randomWord._id, title: randomWord.word }]
        });
    }
    if (status === "change") {
        if (!currentStepDetail)
            throw new CustomAPIError("you are not in this step", 404);
        if (currentStepDetail.action.change <= 2) {
            match.roundsDetail[roundCount].stepDetail[stepCount].words.push({
                wordId: randomWord._id,
                title: randomWord.word
            });
        } else {
            throw new CustomAPIError(
                "you can not change more than 2 time",
                400
            );
        }
    }
    await match.save();
    const words = match.roundsDetail[roundCount].stepDetail[stepCount].words;

    res.status(200).json({
        data: {
            name: categoryName[randomWord.category],
            category: randomWord.category,
            level: randomWord.level,
            words: words[words.length - 1],
            score: scoreList[randomWord.level]
        }
    });
};

module.exports = { fetchRandomWord };
