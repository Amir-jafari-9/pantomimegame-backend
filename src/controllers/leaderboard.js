const mongoose = require("mongoose");
const Game = require("../models/game");
const WordModel = require("../models/word");
const storeRound = require("../validators/storeRound");
const CustomAPIError = require("../errors/custom-error");

const leaderBoard = async (req, res) => {
    const {
        value: { game, cheatCount, restTime, totalScore, word },
        error
    } = storeRound.validate(req.body);
    if (error)
        throw new CustomAPIError(error.toString().replace("Error: ", ""), 422);

    // const getWord = await WordModel.findOne({
    //     _id: word
    // });
    // console.log(word, typeof word);
    // console.log(getWord);

    // 1.az game be step akhar dast resi daram pas be word niaz nadaram
    // 2.as game be round dast resi daram pas tu array rounds Detail
    const match = await Game.findOne({ title: game });
    if (!match) {
        throw new CustomAPIError("game not found", 404);
    }
    const roundCount = match.round;
    const currentRoundDetail = match.roundsDetail[roundCount];
    const stepCount = currentRoundDetail.stepCount;

    currentRoundDetail.stepDetail[stepCount].action.cheat = cheatCount;
    currentRoundDetail.stepDetail[stepCount].playedWord = word;
    currentRoundDetail.stepDetail[stepCount].restTimeScore = restTime;
    currentRoundDetail.stepDetail[stepCount].stepScore = totalScore;

    if (match.round <= match.setting.totalRounds) {
        if (currentRoundDetail.stepCount < match.groups.length) {
            currentRoundDetail.stepCount++;
        } else {
            match.round++;
        }
    } else {
        res.status(200).json({
            data: {
                gg: "wp"
            }
        });
    }

    await match.save();
    res.status(200).json({
        data: {
            gg: "wp"
        }
    });
};
module.exports = leaderBoard;
