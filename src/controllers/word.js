const { clearRepeated } = require("../Utilities/clearRepeated");
const CustomAPIError = require("../errors/custom-error");
const Player = require("../models/game");
const CategoryModel = require("../models/word");
const fetchWordSchema = require("../validators/fetchWord");

const test = async (req, res) => {
    res.status(200).json({
        data: {
            category: "example",
            level: "2",
            word: "گرگ"
        }
    });
};
const createPlayer = async (req, res) => {
    const player = await Player.create({ name: req.body.player });
    res.status(201).json({ player: player.name });
};

const fetchRandomWord = async (req, res) => {
    // check result of validate

    let {
        value: { category, level, player },
        error
    } = fetchWordSchema.validate(req.query);
    if (error)
        throw new CustomAPIError(error.toString().replace("Error: ", ""), 422);

    // for golden question
    if (category === "TG") level = "4";

    // get random data from database
    const [categoryData] = await CategoryModel.aggregate([
        {
            $match: {
                title: category
            }
        },
        {
            $lookup: {
                from: "players",
                localField: "players",
                foreignField: "category",
                as: "players"
            }
        },
        {
            $unwind: {
                path: "$players"
            }
        },
        {
            $match: { "players.name": { $eq: player } }
        },
        {
            $unwind: {
                path: "$words"
            }
        },
        { $match: { "words.level": { $eq: level } } },
        {
            $match: {
                $expr: {
                    $not: {
                        $in: ["$words._id", "$players.repeatedWords"]
                    }
                }
            }
        },
        { $sample: { size: 1 } }
    ]);
    if (!categoryData) {
        throw new CustomAPIError("No data found", 404);
    }

    // {------------------------add selected word to db---------------------------------}

    const wordData = categoryData.words;

    // add random word to Repeated in database
    const playerData = await Player.findOneAndUpdate(
        { name: player, "repeatedWords.title": category },
        {
            $push: { "repeatedWords.$.words": wordData._id }
        },
        { new: true }
    );

    // helper function to clear Repeated if all word use
    clearRepeated(playerData, level, category);

    res.status(200).json({
        data: {
            category: categoryData.title,
            level: wordData.level,
            word: wordData.word
        }
    });
};

module.exports = { fetchRandomWord, createPlayer, test };
