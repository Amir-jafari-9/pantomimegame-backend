const Joi = require("joi");

const createGameValidation = Joi.object({
    game: Joi.string()
        .error(new Error("game should be an string"))
        .empty()
        .error(new Error("game can not be empty"))
        .required()
        .error(new Error("please provide a game"))
        .trim()
        .lowercase()
});
module.exports = createGameValidation;
