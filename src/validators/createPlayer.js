const Joi = require("joi");

const fetchWordSchema = Joi.object({
    category: Joi.string()
        .error(new Error("category should be an string"))
        .empty()
        .error(new Error("category can not be empty"))
        .required()
        .error(new Error("please provide a category"))
        .trim()
        .uppercase()
});
