const Joi = require("joi");
const { gameId, mongooseId } = require("./dto/index.dto");

const storeRound = Joi.object({
    gameId: mongooseId,
    totalCheat: Joi.number().integer().positive().max(3),
    restTime: Joi.number().integer().positive(),
    totalScore: Joi.number().integer().positive(),
    wordId: mongooseId
});

module.exports = storeRound;
