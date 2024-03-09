const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "you should provide a name"],
            unique: [true, "this name is already in use"]
        }
    },
    { timestamps: true }
);

const playerModel = mongoose.model("Player", PlayerSchema);

module.exports = playerModel;
