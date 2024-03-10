const mongoose = require("mongoose");
const Game = require("../models/game");
const WordModel = require("../models/word");
const storeRound = require("../validators/storeRound");
const CustomAPIError = require("../errors/custom-error");

const leaderBoard = async (req, res) => {
    const {
        value: { gameId, cheatCount, restTimePoints, totalScore, wordId },
        error
    } = storeRound.validate(req.body);
    if (error)
        throw new CustomAPIError(error.toString().replace("Error: ", ""), 422);

    const match = await Game.findById(gameId);
    if (!match) {
        throw new CustomAPIError("game not found", 404);
    }
    const roundCount = match.round; // 0
    const currentRoundDetail = match.roundsDetail[roundCount];

    const stepCount = currentRoundDetail.stepCount; //0

    if (roundCount + 1 < match.setting.totalRounds) {
        if (currentRoundDetail.stepCount + 1 < match.groups.length) {
            currentRoundDetail.stepDetail[stepCount].action.cheat = cheatCount;
            currentRoundDetail.stepDetail[stepCount].playedWord = wordId;
            currentRoundDetail.stepDetail[stepCount].restTimeScore =
                restTimePoints;
            currentRoundDetail.stepDetail[stepCount].stepScore = totalScore;
            currentRoundDetail.stepCount++;
            res.status(200).json({ match });
        } else {
            currentRoundDetail.status = "finished";
            match.roundsDetail.push({
                status: "starting",
                points: [],
                stepDetail: [],
                startTime: Date.now(),
                stepCount: 0
            });

            match.round++;
            res.status(200).json({
                data: {
                    gg: "steps finish"
                }
            });
        }
    } else {
        res.status(200).json({
            data: {
                message: "game finish"
            }
        });
    }

    await match.save();
    // res.status(200).json({
    //     data: {
    //         gg: "wp"
    //     }
    // });
};
module.exports = leaderBoard;
