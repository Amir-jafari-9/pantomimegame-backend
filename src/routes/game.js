const express = require("express");
const router = express.Router();

const createGame = require("../controllers/game");
const {
    updateLeaderBoard,
    getGroups
} = require("../controllers/leaderBoardGroups");

router.route("/games/new-game").post(createGame);
router.route("/games/game").get(getGroups).post(updateLeaderBoard);

module.exports = router;
