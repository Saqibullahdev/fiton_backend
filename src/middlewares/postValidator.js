const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const BadRequest = require("../errors/badrequesterror");
const errorResponse = require("../utils/error_response");

function createPostValidator(req, res, next) {
    if (!req.body.title) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Title")));
    }

    if (!req.body.description) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Description")));
    }

    if (!req.body.budget) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Budget")));
    }

    if (!req.body.availability) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Availability")));
    }

    if (!req.body.location) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Location")));
    }

    if (!req.body.durationOfTraining) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Duration of Training")));
    }

    if (!req.body.fitnessLevel) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Fitness Level")));
    }

    if (!req.body.healthConditionsOrInjuries) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Health Conditions or Injuries")));
    }

    if (!req.body.email) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Email")));
    }

    // Validate email format
    const emailRegex = /.+\@.+\..+/;
    if (!emailRegex.test(req.body.email)) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Invalid Email Format")));
    }

    if (!req.body.phone) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Phone")));
    }

    if (!req.body.postDate) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Post Date")));
    }

    if (!req.body.expirationDate) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Expiration Date")));
    }

    if (!req.body.client_id) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Client ID")));
    }

    // If everything looks good
    next();
}

module.exports = {
    createPostValidator
};
