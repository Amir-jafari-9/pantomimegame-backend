const { clearRepeated } = require("../Utilities/clearRepeated");
const getRandomWordQuery = require("../database/getRandomWordQuery");
const CustomAPIError = require("../errors/custom-error");
const Game = require("../models/game");
const Player = require("../models/game");
const CategoryModel = require("../models/word");
const fetchWordSchema = require("../validators/fetchWord");

const fetchRandomWord = async (req, res) => {
    // check result of validate
    let {
        value: { category, level, game },
        error
    } = fetchWordSchema.validate(req.query);
    if (error)
        throw new CustomAPIError(error.toString().replace("Error: ", ""), 422);

    // for golden question
    if (category === "TG") level = "4";

    // get random data from database
    const [categoryData] = await CategoryModel.aggregate(
        getRandomWordQuery(category, game, level)
    );
    if (!categoryData) {
        throw new CustomAPIError("No data found", 404);
    }

    const wordData = categoryData.words;

    // add random word to Repeated in database
    const gameData = await Game.findOneAndUpdate(
        { name: game, "repeatedWords.title": category },
        {
            $push: { "repeatedWords.$.words": wordData._id }
        },
        { new: true }
    );

    // helper function to clear Repeated if all word use
    clearRepeated(gameData, level, category);

    res.status(200).json({
        data: {
            category: categoryData.title,
            level: wordData.level,
            word: wordData.word
        }
    });
};

module.exports = { fetchRandomWord };
