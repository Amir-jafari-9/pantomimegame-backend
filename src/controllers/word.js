const { clearRepeated } = require("../Utilities/clearRepeated");
const CustomAPIError = require("../errors/custom-error");
const CategoryModel = require("../models/word");
const fetchWordSchema = require("../validators/fetchWord");
const categoryName = require("../helpers/categoryName");

const test = (req, res) => {
    res.status(200).json({
        data: {
            category: "example",
            level: "2",
            word: "گرگ"
        }
    });
};

const fetchRandomWord = async (req, res) => {
    // check result of validate
    let {
        value: { category, level },
        error
    } = fetchWordSchema.validate(req.query);
    if (error)
        throw new CustomAPIError(error.toString().replace("Error: ", ""), 422);

    // for golden question
    if (category === "TG") level = "4";

    // get random data from database
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
            name: categoryName[categoryData.title],
            category: categoryData.title,
            level: categoryData.words.level,
            word: categoryData.words.word
        }
    });
};

module.exports = { fetchRandomWord, test };
