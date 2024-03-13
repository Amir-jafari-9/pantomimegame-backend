const mongoose = require("mongoose");
const Game = require("../models/game");
const WordModel = require("../models/word");
const storeRound = require("../validators/storeRound");
const CustomAPIError = require("../errors/custom-error");
const fetchGroups = require("../validators/fetchGroups");
const calculateScore = require("../helpers/calculateScore");

const leaderBoard = async (req, res) => {
    const {
        value: {
            gameId,
            totalCheat,
            restTimePoints,
            totalChange,
            wordId,
            guess
        },
        error
    } = storeRound.validate(req.body);
    if (error)
        throw new CustomAPIError(error.toString().replace("Error: ", ""), 422);

    const match = await Game.findById(gameId);
    if (!match) {
        throw new CustomAPIError("game not found", 404);
    }
    const roundCount = match.round;
    const currentRoundDetail = match.roundsDetail[roundCount];
    const stepCount = match.stepCount;
    const currentStepDetail = currentRoundDetail.stepDetail[stepCount];

    if (match.stepCount <= match.groups.length) {
        // store each data
        currentStepDetail.action.cheat = totalCheat;
        currentStepDetail.action.change = totalChange;
        currentStepDetail.playedWord = wordId;
        currentStepDetail.restTimeScore = restTimePoints;
        // calculate all score
        const scoreResult = calculateScore(
            currentStepDetail.stepSetting.wordPoints,
            restTimePoints,
            totalCheat,
            totalChange,
            guess
        );
        console.log(scoreResult);
        // store Results
        currentStepDetail.stepScore = scoreResult;
        currentRoundDetail.points[match.stepCount].point = scoreResult;
        match.groups[match.stepCount].score += scoreResult;

        match.stepCount++;

        // all steps done and round finished
        if (match.stepCount >= match.groups.length) {
            match.stepCount = 0;
            currentRoundDetail.status = "finished";
            match.round++;

            // if rounds not finished
            if (match.round + 1 <= match.setting.totalRounds) {
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
            } else {
                match.status = "finished";
            }
        }
    }

    await match.save();

    res.status(200).json({
        data: {
            status: match.status,
            allGroups: match.groups
        }
    });
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
            status: game.status,
            allGroup: game.groups,
            currentRound: game.round + 1,
            totalRound: game.setting.totalRounds,
            turn: game.groups[game.stepCount].group
        }
    });
};
module.exports = { leaderBoard, getGroups };
