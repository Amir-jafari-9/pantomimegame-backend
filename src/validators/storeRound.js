const Joi = require("joi");
const { game } = require("./dto/index.dto");

const storeRound = Joi.object({
    game,
    cheatCount: Joi.number().integer().positive().max(3),
    restTime: Joi.number().integer().positive(),
    totalScore: Joi.number().integer().positive(),
    word: Joi.string()
});

module.exports = storeRound;
