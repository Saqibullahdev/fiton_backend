const nodemailer = require('nodemailer');
require('dotenv').config({path:'../../.env'});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.gmail,
        pass: process.env.gmail_passkey
    }
});

// Function to send an email
async function sendEmail(recipient, subject, message) {
    try {
        // Send email
        await transporter.sendMail({
            from: process.env.gmail, // Replace with your Gmail email address
            to: recipient,
            subject: subject,
            text: message
        });

        console.log('Email sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending email:', error.message);
        return false;
    }
}


module.exports = {
    sendEmail
};
