const Joi = require("joi");
module.exports = {
    mongooseId: Joi.object({
        id: Joi.string().hex().length(24)
    })
};
