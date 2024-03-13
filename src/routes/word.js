const express = require("express");
const router = express.Router();
const { fetchRandomWord } = require("../controllers/word");
const categoryWordsCheck = require("../controllers/categoryWordsCheck");

router.route("/words/word").get(fetchRandomWord);
router.route("/words/check-words").get(categoryWordsCheck);
module.exports = router;
