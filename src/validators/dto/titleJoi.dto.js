const Joi = require("joi");
module.exports = {
    title: Joi.string()
        .error(new Error("title should be an string"))
        .empty()
        .error(new Error("title can not be empty"))
        .required()
        .error(new Error("please provide a title"))
        .trim()
        .lowercase()
};
