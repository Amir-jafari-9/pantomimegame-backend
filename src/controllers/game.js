const CustomAPIError = require("../errors/custom-error");
const Game = require("../models/game");
const createGameValidation = require("../validators/createGame");

const createGame = async (req, res) => {
    const {
        value: { game },
        error
    } = createGameValidation.validate(req.body);
    if (error)
        throw new CustomAPIError(error.toString().replace("Error: ", ""), 422);
    const newGame = await Game.create({ name: game });
    res.status(201).json({ game: newGame.name });
};

module.exports = createGame;
