const express = require("express");
const getCategory = require("../controllers/getCategoryName");
const router = express.Router();

router.route("/categories/category").get(getCategory);

module.exports = router;
