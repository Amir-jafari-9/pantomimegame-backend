const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new mongoose.Schema(
    {
        group: {
            type: String,
            required: [true, "Please provide a title for the group"]
        },
        players: [Schema.Types.ObjectId],
        score: {
            type: Number,
            default: 0
        }
    },

    { timestamps: true }
);
const stepSettingSchema = new mongoose.Schema({
    category: String,
    level: String,
    word: String,
    wordPoints: Number
});
const actionSchema = new mongoose.Schema({
    cheat: Number,
    change: Number
});

const stepDetail = new mongoose.Schema(
    {
        stepSetting: stepSettingSchema,
        group: Schema.Types.ObjectId,
        player: Schema.Types.ObjectId,
        words: [{ wordId: Schema.Types.ObjectId, title: String }],
        playedWord: Schema.Types.ObjectId,
        action: { type: actionSchema, default: { cheat: 0, change: 0 } },
        stepScore: { type: Number, default: 0 },
        restTimeScore: { type: Number, default: 0 }
    },
    { timestamps: true }
);
const roundSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: ["running", "starting", "finished"],
            required: [true, "Please provide a valid status"]
        },

        stepDetail: [stepDetail],
        points: [
            {
                group: Schema.Types.ObjectId,
                point: Number
            }
        ],
        startTime: Date,
        endTime: Date
    },
    { timestamps: true }
);
const roundSettingSchema = new mongoose.Schema({
    totalRounds: Number,
    cheatPunishment: Number,
    totalCheat: Number,
    changePunishment: Number,
    totalChange: Number
});

const gameSchema = new mongoose.Schema(
    {
        game: {
            type: String,
            required: [true, "you should provide a name"],
            unique: [true, "the game name '{VALUE}' is already exist"]
        },
        groups: [groupSchema],
        roundsDetail: [roundSchema],
        round: { type: Number, default: 0 },
        stepCount: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ["starting", "running", "finished"],
            required: [true, "Please provide a valid status"]
        },
        repeatedWords: [Schema.Types.ObjectId],
        setting: roundSettingSchema,
        words: {
            type: Schema.Types.ObjectId,
            ref: "words"
        }
    },
    { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
