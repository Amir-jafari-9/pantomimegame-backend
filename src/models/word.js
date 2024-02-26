const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: [true, "please provide a word"]
    },
    level: {
        type: String,
        enum: ["1", "2", "3", "4"],
        required: [true, "please select one of this format ['1','2','3' "]
    }
});
const CategorySchema = new mongoose.Schema({
    title: {
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
        required: [true, "please provide a category name"]
    },
    words: [WordSchema],
    repeated: [mongoose.Schema.Types.ObjectId]
});

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
