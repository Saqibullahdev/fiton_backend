const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const errorResponse = require('../utils/error_response')
const UnauthorizedError = require("../errors/unathorizederror");
const { verifyToken } = require("../helpers/verifytoken");

const isAdmin = function (req, res, next) {
    console.log(req.cookies);
    if(!req.cookies || !req.cookies.admin_token) {
        return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(errorResponse(ReasonPhrases.UNAUTHORIZED, new UnauthorizedError()));
    }
    const { admin_token } = req.cookies;
    let decodedToken;
    try {
        decodedToken = verifyToken(admin_token);
        if(decodedToken.role !== 'admin') {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(errorResponse(ReasonPhrases.UNAUTHORIZED, new UnauthorizedError("please try to login as admin")));
        }
    } catch(error) {
        return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(errorResponse(ReasonPhrases.UNAUTHORIZED, error));
    }

    // modify my request object

    req.admin = { email: decodedToken.email, id: decodedToken._id };

    next();
}


module.exports = {
    isAdmin
}