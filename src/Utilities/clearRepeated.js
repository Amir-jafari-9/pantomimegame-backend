const Player = require("../models/game");
const CategoryModel = require("../models/word");
const clearRepeated = async (player, level, title) => {
    const [category] = await CategoryModel.find({ title });
    const filterDataByLevel = category.words.filter(
        (word) => word.level === level
    );
    const [playerCategory] = player.repeatedWords.filter(
        (repeated) => repeated.title === "TO"
    );
    if (filterDataByLevel.length <= playerCategory.words.length) {
        await Player.updateOne(
            { name: player.name, "repeatedWords.title": title },
            {
                $set: { "repeatedWords.$.words": [] }
            }
        );
    }
};

module.exports = { clearRepeated };
