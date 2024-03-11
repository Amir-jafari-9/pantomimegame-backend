const Joi = require("joi");

const fetchGroups = Joi.object({
    gameId: Joi.string()
        .error(new Error("gameId should be an string"))
        .empty()
        .error(new Error("gameId can not be empty"))
        .required()
        .error(new Error("please provide an gameId"))
        .trim()
});

module.exports = fetchGroups;
