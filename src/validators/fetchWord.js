const Joi = require("joi");
const { category, level, game, status } = require("./dto/index.dto");

const fetchWordSchema = Joi.object({
    category,
    level,
    game,
    status
});

module.exports = fetchWordSchema;
