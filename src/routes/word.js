const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const { getWord, test } = require("../controllers/word");

router.route("/words/word").get(
    query("category")
        .notEmpty()
        .withMessage("category can not be empty")
        .trim()
        .toUpperCase()
        .isIn(["TA", "TO", "TJ", "TC", "TAC", "TE"])
        .withMessage(
            "please select one of this format ['TA', 'TO', 'TJ', 'TC', 'TAC', 'TE'] for level "
        ),
    query("level")
        .notEmpty()
        .withMessage("level can not be empty")
        .trim()
        .isIn(["1", "2", "3"])
        .withMessage(
            "please select one of this format ['1','2','3'] for level "
        ),

    getWord
);
router.route("/test").get(test);

module.exports = router;
