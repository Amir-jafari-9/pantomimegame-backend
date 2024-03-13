const CustomAPIError = require("../errors/custom-error");
const categoryName = require("../helpers/categoryName");

const getCategory = async (req, res) => {
    const categoryId = req.query.categoryId;

    const name = categoryName[categoryId.toUpperCase().trim()];
    res.status(201).json({ name });
};

module.exports = getCategory;
