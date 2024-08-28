const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const errorResponse = require('../utils/error_response')
const UnauthorizedError = require("../errors/unathorizederror");
const { verifyToken } = require("../helpers/verifytoken");

const isTrainer = function (req, res, next) {
    console.log("isTrainer middleware");
    if(!req.cookies || !req.cookies.trainer_token) {
        return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(errorResponse(ReasonPhrases.UNAUTHORIZED, new UnauthorizedError()));
    }
    const { trainer_token } = req.cookies;
    let decodedToken;
    try {
        decodedToken = verifyToken(trainer_token);
        if(decodedToken.role !== 'trainer') {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(errorResponse(ReasonPhrases.UNAUTHORIZED, new UnauthorizedError("please try to login as trainer")));
        }
    } catch(error) {
        return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(errorResponse(ReasonPhrases.UNAUTHORIZED, error));
    }

    // modify my request object

    req.trainer = { email: decodedToken.email, id: decodedToken.id,role: decodedToken.role, username: decodedToken.username};
    console.log("decoded token", decodedToken);
    next();
}


module.exports = {
    isTrainer
}