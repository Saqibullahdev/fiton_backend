const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const errorResponse = require('../utils/error_response')
const UnauthorizedError = require("../errors/unathorizederror");
const { verifyToken } = require("../helpers/verifytoken");

const isClient = function (req, res, next) {
    if(!req.cookies || !req.cookies.client_token) {
        return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(errorResponse(ReasonPhrases.UNAUTHORIZED, new UnauthorizedError()));
    }
    const { client_token } = req.cookies;
    let decodedToken;
    try {
        decodedToken = verifyToken(client_token);
        if(decodedToken.role !== 'client') {

            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(errorResponse(ReasonPhrases.UNAUTHORIZED, new UnauthorizedError("please try to login as client")));
        }
    } catch(error) {
        return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(errorResponse(ReasonPhrases.UNAUTHORIZED, error));
    }

    // modify my request object

    req.client = { email: decodedToken.email, id: decodedToken.id , role: decodedToken.role, username: decodedToken.username};
    next();
}


module.exports = {
    isClient
}