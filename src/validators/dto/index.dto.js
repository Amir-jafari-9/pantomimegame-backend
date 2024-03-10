const { category } = require("./categoryJoi.dto");
const { status } = require("./chengeJoi.dto");

const { game } = require("./gameJoi.dto");
const { level } = require("./levelJoi.dto");
const { mongooseId } = require("./mongooseIdJoi.dto");
const { roundsSetting } = require("./roundsSettingJoi.dto");
const { title } = require("./titleJoi.dto");

module.exports = {
    category,
    status,
    game,
    level,
    roundsSetting,
    title,
    mongooseId
};
