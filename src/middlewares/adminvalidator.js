const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const BadRequest = require("../errors/badrequesterror");
const errorResponse = require("../utils/error_response");

function createAdminValidator(req, res, next) {
    if (!req.body.username) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Username")));
    }

    if (!req.body.email) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Email")));
    }

    if (!req.body.password) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Password")));
    }

    // Validate email format
    const emailRegex = /.+\@.+\..+/;
    if (!emailRegex.test(req.body.email)) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Invalid Email Format")));
    }

    // If everything looks good
    next();
}

module.exports = {
    createAdminValidator
};
