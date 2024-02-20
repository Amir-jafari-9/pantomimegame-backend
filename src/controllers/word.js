const { clearRepeated } = require("../Utilities/clearRepeated");
const CustomAPIError = require("../errors/custom-error");
const CategoryModel = require("../models/word");
const { validationResult } = require("express-validator");

const test = (req, res) => {
    res.status(200).json({
        data: {
            category: "example",
            level: "2",
            word: "گرگ"
        }
    });
};

const getWord = async (req, res) => {
    // handle any error in validated body
    const resultValidator = validationResult(req);

    if (resultValidator.errors.length > 0)
        throw new CustomAPIError(resultValidator.errors[0].msg, 422);

    const { category, level } = req.query;
    const [categoryData] = await CategoryModel.aggregate([
        {
            $match: {
                title: category
            }
        },
        {
            $unwind: {
                path: "$words"
            }
        },
        { $match: { "words.level": { $eq: level } } },

        {
            $match: {
                $expr: {
                    $not: {
                        $in: ["$words._id", "$repeated"]
                    }
                }
            }
        },
        { $sample: { size: 1 } }
    ]);

    // add random word to Repeated in database
    const newCategoryData = await CategoryModel.findByIdAndUpdate(
        categoryData._id,
        {
            $push: { repeated: categoryData.words._id }
        }
    );

    // helper function to clear Repeated if all word use
    clearRepeated(newCategoryData, level);

    res.status(200).json({
        data: {
            category: categoryData.title,
            level: categoryData.words.level,
            word: categoryData.words.word
        }
    });
};

module.exports = { getWord, test };
