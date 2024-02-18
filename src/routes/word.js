const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { getWord } = require("../controller/word");

router.route("/words/word").get(
    body("category")
        .isString()
        .withMessage("category should be string")
        .notEmpty()
        .withMessage("category can not be empty")
        .trim()
        .toUpperCase()
        .isIn(["TA", "TO", "TJ", "TC", "TAC", "TE"])
        .withMessage(
            "please select one of this format ['TA', 'TO', 'TJ', 'TC', 'TAC', 'TE'] for level "
        ),
    body("level")
        .isString()
        .withMessage("level should be a string value")
        .notEmpty()
        .withMessage("level can not be empty")
        .trim()
        .isIn(["1", "2", "3"])
        .withMessage(
            "please select one of this format ['1','2','3'] for level "
        ),

    getWord
);
// router.route("/test").get(test);

module.exports = router;
