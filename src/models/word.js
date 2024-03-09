const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema(
    {
        word: {
            type: String,
            required: [true, "please provide a word"]
        },
        level: {
            type: String,
            enum: ["1", "2", "3", "4"],
            required: [true, "please select one of this format ['1','2','3'] "]
        },
        category: {
            type: String,
            enum: [
                "TJ",
                "TS",
                "TCH",
                "TE",
                "TB",
                "TA",
                "TO",
                "TF",
                "TM",
                "TT",
                "TAC",
                "TTE",
                "TK",
                "TZ",
                "TET",
                "TCC",
                "TG"
            ],
            required: [true, "Please provide a valid category"]
        },
        game: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game"
        }
    },
    { timestamps: true }
);

WordSchema.virtual("Game", {
    ref: "Game",
    localField: "_id",
    foreignField: "words"
});

const WordModel = mongoose.model("Words", WordSchema);

module.exports = WordModel;
