const express = require("express");
const router = express.Router();
const { fetchRandomWord, createPlayer, test } = require("../controllers/word");

router.route("/words/word").get(fetchRandomWord);
router.route("/players/new-player").post(createPlayer);
router.route("/test").get(test);

module.exports = router;
