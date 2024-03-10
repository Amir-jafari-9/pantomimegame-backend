const Joi = require("joi");
module.exports = {
    game: Joi.string()
        .error(new Error("game should be an string"))
        .empty()
        .error(new Error("game can not be empty"))
        .required()
        .error(new Error("please provide a game"))
        .trim()
};
