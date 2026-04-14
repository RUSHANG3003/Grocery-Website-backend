const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rdgandhi3003@gmail.com',
        pass: 'clwo wgyc thej wnpi',
    },
});

const sendOtpEmail = async (emailId, otp) => {
    try {
        const mailOptions = {
            from: 'rdgandhi3003@gmail.com',
            to: emailId,
            subject: "Your OTP Code",
            html: `<h2>Email Verification</h2><p>Your OTP is: <b>${otp}</b></p><p>This OTP will expire in 5 minutes.</p>`
        };
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent successfully to ${emailId}`);
    } catch (error) {
        console.error("Error sending OTP email:", error);
    }
};

const sendThankYouEmail = async (emailId, name) => {
    try {
        const mailOptions = {
            from: 'rdgandhi3003@gmail.com',
            to: emailId,
            subject: "Thank You for Reaching Us",
            html: `<h2>Thank You!</h2><p>Dear ${name},</p><p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>`
        };
        await transporter.sendMail(mailOptions);
        console.log(`Thank You email sent successfully to ${emailId}`);
    } catch (error) {
        console.error("Error sending Thank You email:", error);
    }
};

module.exports = { sendOtpEmail, sendThankYouEmail };
