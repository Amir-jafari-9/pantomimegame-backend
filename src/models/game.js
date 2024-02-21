const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
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
// "TJ","TS","TCH","TE","TB","TA","TO","TF","TM","TT","TAC","TTE","TK","TZ","TET","TCC","TG"

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
