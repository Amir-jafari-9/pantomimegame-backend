const mongoose = require("mongoose");
const Game = require("../models/game");
const WordModel = require("../models/word");
const storeRound = require("../validators/storeRound");
const CustomAPIError = require("../errors/custom-error");
const fetchGroups = require("../validators/fetchGroups");

const leaderBoard = async (req, res) => {
    const {
        value: { gameId, totalCheat, restTimePoints, totalChange, wordId },
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

    const stepCount = match.stepCount; //0
    const currentStepDetail = currentRoundDetail.stepDetail[stepCount];

    if (roundCount <= match.setting.totalRounds - 1) {
        if (match.stepCount <= match.groups.length) {
            // store each data
            currentStepDetail.action.cheat = totalCheat;
            currentStepDetail.action.change = totalChange;
            currentStepDetail.playedWord = wordId;
            currentStepDetail.restTimeScore = restTimePoints;
            // calculate all score
            const scoreResult =
                currentStepDetail.stepSetting.wordPoints +
                currentStepDetail.restTimeScore +
                currentStepDetail.action.cheat * -1 +
                currentStepDetail.action.change * -1;
            currentStepDetail.stepScore = scoreResult;

            currentRoundDetail.points[match.stepCount].point = scoreResult;

            match.groups[match.stepCount].score += scoreResult;
            match.stepCount++;
            if (match.stepCount >= match.groups.length) {
                if (match.round >= match.setting.totalRounds) {
                }
                match.round++;
                match.stepCount = 0;
                currentRoundDetail.status = "finished";
                match.roundsDetail.push({
                    status: "starting",
                    points: [],
                    stepDetail: [],
                    startTime: Date.now()
                });
                const groupsId = match.groups.map((group) => group._id);
                groupsId.map((groupId) =>
                    match.roundsDetail[
                        match.roundsDetail.length - 1
                    ].points.push({
                        group: groupId,
                        point: 0
                    })
                );
            }
        }
        res.status(200).json({ match });
    } else {
        res.status(200).json({
            data: {
                message: "game finish"
            }
        });
    }

    await match.save();
};

const getGroups = async (req, res) => {
    const {
        value: { gameId },
        error
    } = fetchGroups.validate(req.query);
    if (error)
        throw new CustomAPIError(error.toString().replace("Error: ", ""), 422);
    const game = await Game.findById(gameId);
    res.status(200).json({
        data: {
            allGroup: game.groups,
            currentRound: game.round + 1,
            totalRound: game.setting.totalRounds,
            turn: game.groups[game.stepCount].group
        }
    });
};
module.exports = { leaderBoard, getGroups };
