const {sendEmail}=require('../utils/sendEmail.js')

// Function to send an email
const sendMail = async (req, res) => {
    const { name, email, contactNo, message } = req.body;
    if (!name || !email || !contactNo || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' ,ok:false});
    }

    try {
        const isSend=await sendEmail({
            from: email,
            subject: `Message from ${name}`,
            message: `Name: ${name}\nContact No: ${contactNo}\nEmail: ${email}\nMessage: ${message}`
        });
        if(!isSend){
            return res.status(500).json({ success: false, message: 'Failed to send email',ok:false });
        }
        res.status(200).json({ success: true, message: 'Email sent successfully',ok:true });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
    }
};

module.exports = { sendMail };
