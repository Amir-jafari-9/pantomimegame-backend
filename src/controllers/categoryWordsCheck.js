const checkWords = require("../database/checkWordsQuery");
const CustomAPIError = require("../errors/custom-error");
const GameModel = require("../models/game");
const WordModel = require("../models/word");
const checkWordsValidation = require("../validators/categoryWordsCheck");

const categoryWordsCheck = async (req, res) => {
    const {
        value: { gameId, category },
        error
    } = checkWordsValidation.validate(req.query);
    if (error)
        throw new CustomAPIError(error.toString().replace("Error: ", ""), 422);

    const match = await GameModel.findById(gameId);
    if (category === "TG") {
        const golden = await WordModel.aggregate(
            checkWords(category, match._id, "4")
        );
        console.log(golden);
        res.status(200).json({ quantity: { super: golden.length } });
    } else {
        const levelEasy = await WordModel.aggregate(
            checkWords(category, match._id, "1")
        );
        const levelNormal = await WordModel.aggregate(
            checkWords(category, match._id, "2")
        );
        const levelHard = await WordModel.aggregate(
            checkWords(category, match._id, "3")
        );

        res.status(200).json({
            quantity: {
                easy: levelEasy.length,
                normal: levelNormal.length,
                hard: levelHard.length
            }
        });
    }
};

module.exports = categoryWordsCheck;
