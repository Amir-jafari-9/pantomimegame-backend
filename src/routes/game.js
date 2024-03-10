const express = require("express");
const router = express.Router();

const createGame = require("../controllers/game");
const leaderBoard = require("../controllers/leaderboard");

router.route("/games/new-game").post(createGame);
router.route("/games/game").post(leaderBoard);

module.exports = router;
