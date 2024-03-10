require("dotenv").config();
require("express-async-errors");
// extra security packages
const helmet = require("helmet");
const cors = require("cors");

const mongoose = require("mongoose");
const express = require("express");
const app = express();

// const { importData } = require("./Utilities/importData");

// routers
const wordRoute = require("./routes/word");
const gameRoute = require("./routes/game");

// error handler
const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error_handler");

const port = process.env.PORT || 3000;

// handel req.body
app.use(express.json());

app.use(cors());
app.use(helmet());

// Routes
app.use("/api/v1", wordRoute);
app.use("/api/v1", gameRoute);

app.get("/api/v1/version", (req, res) => {
    res.status(200).json({
        success: true,
        version: process.env.APP_VERSION || "version not set"
    });
});

// middleware
app.use(errorHandlerMiddleware);
app.use(notFound);

const start = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI,
            console.log("database connected ...")
        );
        // importData();
        app.listen(port, console.log(`server is listening to port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};
start();
