require("dotenv").config();
const fs = require("fs");
const WordModel = require("../models/word");
const mongoose = require("mongoose");
const path = require("path");

const wordsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "wordsv2.json"), "utf-8")
);

// import data to MongoDB
const importData = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI,
            console.log("database connected ...")
        );
        const data = await WordModel.find({});
        if (data.length > 0) {
            await WordModel.deleteMany({});
        }
        for (const key in wordsData) {
            if (wordsData.hasOwnProperty(key)) {
                const itemData = wordsData[key];

                await WordModel.create(itemData);
            }
        }
        console.log("data successfully imported");
        process.exit();
    } catch (error) {
        console.log("data not imported something went wrong", error);
    }
};
importData();
