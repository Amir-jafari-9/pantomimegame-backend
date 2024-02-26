const CategoryModel = require("../models/word");
const clearRepeated = async (category, level) => {
    const filterDataByLevel = category.words.filter(
        (word) => word.level === level
    );

    if (filterDataByLevel.length <= category.repeated.length + 1)
        await CategoryModel.findByIdAndUpdate(category._id, {
            repeated: []
        });
};

module.exports = { clearRepeated };
