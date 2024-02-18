require("dotenv").config();
require("express-async-errors");
// extra security packages
const helmet = require("helmet");
const cors = require("cors");

const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

const mongoCon = require("./connection/mongoCon");
const { importData } = require("./common/importData");

// routers
const wordRoute = require("./routes/word");

// error handler
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error_handler");

const port = process.env.PORT || 3000;

// handel req.body
app.use(express.json());

app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        handler: function (req, res /*, next*/) {
            res.status(429).json({
                status: 429,
                success: false,
                message:
                    "Too many requests from this IP, please try again later.",
                data: null
            });
        }
    })
);
app.use(cors());
app.use(helmet());

// Routes
app.use("/api/v1", wordRoute);

// middleware
app.use(errorHandlerMiddleware);
app.use(notFound);

const start = async () => {
    try {
        await mongoCon(
            process.env.MONGO_URI,
            console.log("database connected ...")
        );
        importData();
        app.listen(port, console.log(`server is listening to port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};
start();
