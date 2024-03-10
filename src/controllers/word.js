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
        value: { category, level, gameId, status },
        error
    } = fetchWordSchema.validate(req.query);
    if (error)
        throw new CustomAPIError(error.toString().replace("Error: ", ""), 422);

    // for golden question
    if (category === "TG") level = "4";

    const match = await Game.findById(gameId);
    if (!match) {
        throw new CustomAPIError("game not found", 404);
    }

    // store some value for better access
    const roundCount = match.round;
    const currentRoundDetail = match.roundsDetail[roundCount];
    const gameGroups = match.groups;
    const stepCount = currentRoundDetail.stepCount;
    const currentStepDetail =
        currentRoundDetail.stepDetail[currentRoundDetail.stepCount];

    const [randomWord] = await WordModel.aggregate(
        getRandomWordQuery(category, match.title, level)
    );
    // console.log(randomWord);
    if (!randomWord) {
        throw new CustomAPIError("No data found", 404);
    }
    console.log(randomWord);

    match.repeatedWords.push(randomWord._id);

    if (status === "new") {
        currentRoundDetail.status = "running";
        currentRoundDetail.stepDetail.push({
            stepSetting: { category, level },
            group: gameGroups[currentRoundDetail.stepCount]._id,
            // player: "plyer._id",
            words: [{ id: randomWord._id, title: randomWord.word }],
            action: { change: 0, cheat: 0 },
            score: 0
        });
    }
    if (status === "change") {
        if (!currentStepDetail)
            throw new CustomAPIError("you are not in this step", 404);

        if (currentStepDetail.action.change <= 2) {
            match.roundsDetail[roundCount].stepDetail[
                stepCount
            ].action.change += 1;
            match.roundsDetail[roundCount].stepDetail[stepCount].words.push({
                wordId: randomWord._id,
                title: randomWord.word
            });
        }
    }
    await match.save();

    res.status(200).json({
        data: {
            name: categoryName[randomWord.category],
            category: randomWord.category,
            level: randomWord.level,
            words: match.roundsDetail[roundCount].stepDetail[stepCount].words,
            score: scoreList[randomWord.level]
        }
    });
};

module.exports = { fetchRandomWord };

// get random data from database
// const [categoryData] = await CategoryModel.aggregate(
//     getRandomWordQuery(category, game, level)
// );
// if (!categoryData) {
//     throw new CustomAPIError("No data found", 404);
// }

// const wordData = categoryData.words;

// // add random word to Repeated in database
// const gameData = await Game.findOneAndUpdate(
//     { name: game, "repeatedWords.title": category },
//     {
//         $push: { "repeatedWords.$.words": wordData._id }
//     },
//     { new: true }
// );

// // helper function to clear Repeated if all word use
// clearRepeated(gameData, level, category);
