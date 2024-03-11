const Joi = require("joi");
const { title, roundsSetting } = require("./dto/index.dto");

let group = Joi.object().keys({
    group: title
});

const createGameValidation = Joi.object({
    title,
    groups: Joi.array().items(group),
    roundsSetting
});
module.exports = createGameValidation;
