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
        .valid("TA", "TO", "TJ", "TC", "TAC", "TE")
        .error(
            new Error(
                "please select one of this format ['TA', 'TO', 'TJ', 'TC', 'TAC', 'TE'] for level "
            )
        ),
    level: Joi.string()
        .error(new Error("level should be an string"))
        .empty()
        .error(new Error("level can not be empty"))
        .required()
        .error(new Error("please provide a category"))
        .trim()
        .valid("1", "2", "3")
        .error(
            new Error(
                "please select one of this format ['1','2','3'] for level "
            )
        )
});

module.exports = fetchWordSchema;
