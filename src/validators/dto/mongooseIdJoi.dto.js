const Joi = require("joi");
module.exports = {
    mongooseId: Joi.string()
        .error(new Error("id should be an string"))
        .empty()
        .error(new Error("id can not be empty"))
        .required()
        .error(new Error("please provide an id"))
        .trim()
};
