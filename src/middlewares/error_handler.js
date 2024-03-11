const CustomAPIError = require("../errors/custom-error");

const errorHandlerMiddleware = async (err, req, res, next) => {
    console.log(err);
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({
            message: err.message,
            data: null
        });
    }
    return res.status(500).json({
        message: err.message,
        data: null
    });
};
module.exports = errorHandlerMiddleware;
