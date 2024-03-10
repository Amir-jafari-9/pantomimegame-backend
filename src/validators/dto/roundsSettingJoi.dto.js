const Joi = require("joi");
module.exports = {
    roundsSetting: Joi.object().keys({
        totalRounds: Joi.number().integer().positive().max(15),
        cheatPunishment: Joi.number().integer().negative().min(-6),
        totalCheat: Joi.number().integer().positive().max(3),
        changePunishment: Joi.number().integer().negative().min(-4),
        totalChange: Joi.number()
            .integer()
            .greater(-1)
            .error(new Error("total change most be greater or equal to 0"))
    })
};
