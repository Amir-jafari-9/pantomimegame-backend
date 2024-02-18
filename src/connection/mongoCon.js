const mongoose = require("mongoose");

const mongoCon = (url) => {
    mongoose.connect(url);
};
module.exports = mongoCon;
