/**
 * this file is used to create the feedback model
 * the feedback model is used to store the feedbacks of the client
 * on the services provided by the Website
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    name: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true});

module.exports = mongoose.model('Feedback', feedbackSchema);