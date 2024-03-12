const CustomAPIError = require("../errors/custom-error");
const Game = require("../models/game");
const createGameValidation = require("../validators/createGame");

const createGame = async (req, res) => {
    const {
        value: { title, groups, roundsSetting },
        error
    } = createGameValidation.validate(req.body);
    if (error)
        throw new CustomAPIError(error.toString().replace("Error: ", ""), 422);

    const newGame = await Game.create({
        game: title,
        status: "starting",
        groups: groups,
        setting: roundsSetting,
        roundsDetail: [
            {
                status: "starting",
                points: [],
                stepDetail: [],
                startTime: Date.now()
            }
        ]
    });

    const groupsId = newGame.groups.map((group) => group._id);
    groupsId.map((groupId) =>
        newGame.roundsDetail[newGame.roundsDetail.length - 1].points.push({
            group: groupId,
            point: 0
        })
    );

    await newGame.save();
    res.status(201).json({ gameId: newGame._id });
};

module.exports = createGame;
