const Joi = require("joi");
module.exports = {
    status: Joi.string()
        .error(new Error("status should be an string"))
        .empty()
        .error(new Error("status can not be empty"))
        .required()
        .error(new Error("please provide a status"))
        .trim()
        .valid("change", "new")
        .error(
            new Error(
                "please select one of this format ['change','new'] for change "
            )
        )
};
