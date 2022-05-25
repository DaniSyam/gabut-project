const nodemailer = require("nodemailer")

function sendEmail(target, subject, text) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
    })
    const mailOptions = {
        from: process.env.EMAIL,
        to: target,
        subject: subject,
        text: text
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return error.message
        } else {
            return info.response
        }
    })
}

module.exports = { sendEmail }