const Joi = require("joi");
module.exports = {
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
        )
};
