const express = require("express");
const router = express.Router();
const { fetchRandomWord, test } = require("../controllers/word");

router.route("/words/word").get(fetchRandomWord);
router.route("/test").get(test);

module.exports = router;
