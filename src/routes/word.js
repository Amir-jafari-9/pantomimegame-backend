const express = require("express");
const router = express.Router();
const { fetchRandomWord } = require("../controllers/word");
const createPlayer = require("../controllers/game");
const test = require("../controllers/test");

router.route("/words/word").get(fetchRandomWord);
router.route("/games/new-game").post(createPlayer);
router.route("/test").get(test);

module.exports = router;
