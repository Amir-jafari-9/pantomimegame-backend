const GameModel = require("../models/game");
const storeRoundValidator = require("../validators/storeRound");
const CustomAPIError = require("../errors/custom-error");
const fetchGroupsValidator = require("../validators/fetchGroups");
const calculateScoreHelper = require("../helpers/calculateScore");

const updateLeaderBoard = async (req, res) => {
    const { value: roundData, error } = storeRoundValidator.validate(req.body);
    if (error)
        throw new CustomAPIError(error.toString().replace("Error: ", ""), 422);

    const match = await GameModel.findById(roundData.gameId);
    if (!match) throw new CustomAPIError("Game not found", 404);

    const currentRoundDetail = match.roundsDetail[match.round];
    const currentStepDetail = currentRoundDetail.stepDetail[match.stepCount];

    if (match.stepCount < match.groups.length) {
        // Update step details
        currentStepDetail.action.cheat = roundData.totalCheat;
        currentStepDetail.action.change = roundData.totalChange;
        currentStepDetail.playedWord = roundData.wordId;
        currentStepDetail.restTimeScore = roundData.restTimePoints;

        // Calculate score
        const scoreResult = calculateScoreHelper(
            currentStepDetail.stepSetting.wordPoints,
            roundData.restTimePoints,
            roundData.totalCheat,
            roundData.totalChange,
            roundData.guess
        );

        // Store results
        currentStepDetail.stepScore = scoreResult;
        currentRoundDetail.points[match.stepCount].point = scoreResult;
        match.groups[match.stepCount].score += scoreResult;

        match.stepCount++;

        match.pass = true;

        // Check if round finished
        if (match.stepCount >= match.groups.length) {
            match.stepCount = 0;
            currentRoundDetail.status = "finished";
            match.round++;

            // Check if all rounds finished
            if (match.round + 1 <= match.setting.totalRounds) {
                match.roundsDetail.push({
                    status: "starting",
                    points: [],
                    stepDetail: [],
                    startTime: Date.now()
                });

                const groupsId = match.groups.map((group) => group._id);
                groupsId.forEach((groupId) =>
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
    } = fetchGroupsValidator.validate(req.query);
    if (error)
        throw new CustomAPIError(error.toString().replace("Error: ", ""), 422);

    const game = await GameModel.findById(gameId);
    res.status(200).json({
        data: {
            status: game.status,
            allGroups: game.groups,
            currentRound: game.round + 1,
            totalRound: game.setting.totalRounds,
            turn: game.groups[game.stepCount].group
        }
    });
};
module.exports = { updateLeaderBoard, getGroups };
