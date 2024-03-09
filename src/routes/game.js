const express = require("express");
const router = express.Router();

const createGame = require("../controllers/game");
const storeRoundStep = require("../controllers/roundStep");

router.route("/games/new-game").post(createGame);
router.route("/games/game").post(storeRoundStep);

module.exports = router;
