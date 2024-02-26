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
        .valid(
            "TJ",
            "TS",
            "TCH",
            "TE",
            "TB",
            "TA",
            "TO",
            "TF",
            "TM",
            "TT",
            "TAC",
            "TTE",
            "TK",
            "TZ",
            "TET",
            "TCC",
            "TG"
        )
        .error(
            new Error(
                "please select one of this format ['TJ'  , 'TS'  , 'TCH'  ,'TE'  , 'TB' , 'TA'  ,'TO'  ,'TF' ,'TM'  ,'TT' ,'TAC'  ,'TTE' ,'TK' ,'TZ'  ,'TET' ,'TCC','TG'] for level "
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
