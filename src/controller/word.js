const CustomAPIError = require("../error/custom-error");
const CategoryModel = require("../model/word");
const { validationResult } = require("express-validator");

const test = (req, res) => {
    res.status(200).json({
        data: {
            category: "test",
            difficulty: "test-difficulty",
            word: "test word"
        }
    });
};

const getWord = async (req, res) => {
    // handle any error in validated body
    const resultValidator = validationResult(req);

    if (resultValidator.errors.length > 0)
        throw new CustomAPIError(resultValidator.errors[0].msg, 422);

    // get data from database
    const { category, level } = req.body;
    const [categoryData] = await CategoryModel.find({ title: category });
    if (!categoryData)
        throw new CustomAPIError(`category '${category}' not found  `, 404);

    // get all words is match with level
    const filterByLevel = categoryData.words
        .filter((word) => word.level === level)
        .map((wordObj) => wordObj.word);

    // generate a random word
    const randomNumber = Math.floor(Math.random() * filterByLevel.length);
    const randomWord = filterByLevel[randomNumber];

    res.status(200).json({
        data: {
            category: category,
            level: level,
            word: randomWord
        }
    });
};
// const addWord = async (req, res) => {
//     const word = await CategoryModel.create(req.body);
//     res.status(200).json({
//         status: 201,
//         success: true,
//         message: "add word successfully",
//         data: {
//             category: word.categoryName,
//             difficulty: word.words[0].difficulty,
//             word: word.words[0].word
//         }
//     });
// };
// module.exports = { getWord, addWord, test };

module.exports = { getWord, test };
