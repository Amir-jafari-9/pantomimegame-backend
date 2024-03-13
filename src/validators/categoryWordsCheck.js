const Joi = require("joi");
const { category, game } = require("./dto/index.dto");

const checkWordsValidation = Joi.object({
    category,
    gameId: game
});

module.exports = checkWordsValidation;
