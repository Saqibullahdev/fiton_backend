const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
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
        default: 'client'
    },
    otp:{
        type: String,
        default: null
    },
    otpExpires:{
        type: Date,
        default: null
    },

    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
},{timestamps: true});

module.exports = mongoose.model('Client', clientSchema);