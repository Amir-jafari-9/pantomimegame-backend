const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "you should provide a name"],
        unique: [true, "this name is already in use"]
    },
    repeatedWords: {
        type: [{ title: String, words: [mongoose.Schema.Types.ObjectId] }],
        default: [
            { title: "TJ", words: [] },
            { title: "TS", words: [] },
            { title: "TCH", words: [] },
            { title: "TE", words: [] },
            { title: "TB", words: [] },
            { title: "TA", words: [] },
            { title: "TO", words: [] },
            { title: "TF", words: [] },
            { title: "TM", words: [] },
            { title: "TT", words: [] },
            { title: "TAC", words: [] },
            { title: "TTE", words: [] },
            { title: "TK", words: [] },
            { title: "TZ", words: [] },
            { title: "TET", words: [] },
            { title: "TCC", words: [] },
            { title: "TG", words: [] }
        ]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
