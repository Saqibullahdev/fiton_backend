// Import necessary modules and utilities
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const errorResponse = require('../utils/error_response');
const UnauthorizedError = require("../errors/unathorizederror");
const { verifyToken } = require("../helpers/verifytoken");

// Middleware function to check if the user is a trainer or client
const isTrainerOrClient = function (req, res, next) {
    
    // Check if the cookies for trainer or client tokens are missing
    if (!req.cookies || (!req.cookies.trainer_token && !req.cookies.client_token)) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json(errorResponse(ReasonPhrases.UNAUTHORIZED, new UnauthorizedError()));
    }

    const { trainer_token, client_token } = req.cookies;
    let decodedToken;
    let role;

    try {
        // Verify the token based on the role (trainer or client)
        if (trainer_token) {
            decodedToken = verifyToken(trainer_token);
            if(!decodedToken.isVerified) throw new UnauthorizedError("You are not verified ,Please verify your account to continue");
            role = 'trainer';

        } else if (client_token) {
            decodedToken = verifyToken(client_token);
            role = 'client';
        } else {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(errorResponse(ReasonPhrases.UNAUTHORIZED, new UnauthorizedError("Invalid token")));
        }

        // Check if the role in the token matches the expected role
        if ((role === 'trainer' && decodedToken.role !== 'trainer') || (role === 'client' && decodedToken.role !== 'client')) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(errorResponse(ReasonPhrases.UNAUTHORIZED, new UnauthorizedError("Invalid role for token")));
        }
    } catch (error) {
        // Handle any errors during token verification
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

    // Proceed to the next middleware function
    next();
}

// Export the middleware function for use in other parts of the application
module.exports = {
    isTrainerOrClient
}
