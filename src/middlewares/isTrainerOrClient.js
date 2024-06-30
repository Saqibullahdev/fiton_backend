const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const errorResponse = require('../utils/error_response');
const UnauthorizedError = require("../errors/unathorizederror");
const { verifyToken } = require("../helpers/verifytoken");

const isTrainerOrClient = function (req, res, next) {
    console.log("istrainerOrClient Middleware called");
    if (!req.cookies || (!req.cookies.trainer_token && !req.cookies.client_token)) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json(errorResponse(ReasonPhrases.UNAUTHORIZED, new UnauthorizedError()));
    }

    const { trainer_token, client_token } = req.cookies;
    let decodedToken;
    let role;

    try {
        if (trainer_token) {
            decodedToken = verifyToken(trainer_token);
            role = 'trainer';
        } else if (client_token) {
            decodedToken = verifyToken(client_token);
            role = 'client';
        } else {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(errorResponse(ReasonPhrases.UNAUTHORIZED, new UnauthorizedError("Invalid token")));
        }

        console.log(decodedToken);
        if ((role === 'trainer' && decodedToken.role !== 'trainer') || (role === 'client' && decodedToken.role !== 'client')) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(errorResponse(ReasonPhrases.UNAUTHORIZED, new UnauthorizedError("Invalid role for token")));
        }
    } catch (error) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json(errorResponse(ReasonPhrases.UNAUTHORIZED, error));
    }

    // Modify the request object based on the role
    if (role === 'trainer') {
        req.trainer = { email: decodedToken.email, id: decodedToken.id };
    } else if (role === 'client') {
        req.client = { email: decodedToken.email, id: decodedToken.id };
    }

    next();
}

module.exports = {
    isTrainerOrClient
}
