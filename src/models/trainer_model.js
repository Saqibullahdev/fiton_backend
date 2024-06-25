const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainerSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    date_of_birth: {
        type: Date,
        required: true
    },

    role: {
        type: String,
        default: 'trainer'
    },

    expertise: {
        type: String,
        required: true
    },
    
    certification: {
        type: String,
        required: true
    },

    experience: {
        type: String,
        required: true
    },

    availability: {
        type: String,
        required: true
    },
    biography:{
        type: String,
        required: true
    }
    ,

    training_locations: {
        type: String,
        required: true
    },

    isVerified: {
        type: Boolean,
        default: false
    }

},{timestamps: true});

module.exports = mongoose.model('Trainer', trainerSchema);