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
async function sendEmail({from,subject, message}) {
    try {
        // Send email
       const isSend= await transporter.sendMail({
            from: from, // Replace with your Gmail email address
            to: process.env.gmail, // Replace with the recipient email address
            subject: subject,
            text: message,
            
        });
        if(!isSend){
            throw new Error('Failed to send email');
        }

        return true;
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error(error.message);
    }
}


module.exports = {
    sendEmail
};
