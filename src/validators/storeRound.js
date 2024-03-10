const Joi = require("joi");
const { mongooseId } = require("./dto/index.dto");

const storeRound = Joi.object({
    gameId: Joi.string()
        .error(new Error("gameId should be an string"))
        .empty()
        .error(new Error("gameId can not be empty"))
        .required()
        .error(new Error("please provide an gameId"))
        .trim(),
    totalCheat: Joi.number().integer().positive().max(3),
    restTimePoints: Joi.number().integer().positive(),
    totalScore: Joi.number().integer().positive(),
    wordId: Joi.string()
        .error(new Error("gameId should be an string"))
        .empty()
        .error(new Error("gameId can not be empty"))
        .required()
        .error(new Error("please provide an gameId"))
        .trim()
});

module.exports = storeRound;
