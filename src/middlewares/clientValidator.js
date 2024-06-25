const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const BadRequest = require("../errors/badrequesterror");
const errorResponse = require("../utils/error_response");

function createClientValidator(req, res, next) {
    if(!req.body.fullname) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Fullname")));
    }

    if(!req.body.email) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Email")));
    }

    if(!req.body.phone_number) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Phone Number")));
    }

    if(!req.body.password) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Password")));
    }

    if(!req.body.gender) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Gender")));
    }

    if(!req.body.date_of_birth) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Date of Birth")));
    }

    if(!req.body.expertise) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Expertise")));
    }

    if(!req.body.certification) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Certification")));
    }

    if(!req.body.experience) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Experience")));
    }

    if(!req.body.availability) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Availability")));
    }

    if(!req.body.biography) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Biography")));
    }

    if(!req.body.training_locations) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Training Locations")));
    }

    // If everything looks good
    next();
}

module.exports = {
    createClientValidator
};
