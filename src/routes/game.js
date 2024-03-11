const express = require("express");
const router = express.Router();

const createGame = require("../controllers/game");
const { leaderBoard, getGroups } = require("../controllers/leaderboard");

router.route("/games/new-game").post(createGame);
router.route("/games/game").get(getGroups).post(leaderBoard);

module.exports = router;
