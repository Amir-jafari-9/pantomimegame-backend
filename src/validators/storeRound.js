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
    totalCheat: Joi.number().integer().greater(-1).max(3),
    restTimePoints: Joi.number().integer().greater(-1),
    totalChange: Joi.number().integer().greater(-1),
    wordId: Joi.string()
        .error(new Error("gameId should be an string"))
        .empty()
        .error(new Error("gameId can not be empty"))
        .required()
        .error(new Error("please provide an gameId"))
        .trim()
});

module.exports = storeRound;
