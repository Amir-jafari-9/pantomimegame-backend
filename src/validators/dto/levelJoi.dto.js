const Joi = require("joi");
module.exports = {
    level: Joi.string()
        .error(new Error("level should be an string"))
        .empty()
        .error(new Error("level can not be empty"))
        .required()
        .error(new Error("please provide a category"))
        .trim()
        .valid("1", "2", "3", "4")
        .error(
            new Error(
                "please select one of this format ['1','2','3','4'] for level "
            )
        )
};
