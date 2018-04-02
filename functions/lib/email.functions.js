"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const nodemailer_1 = require("nodemailer");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer_1.nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});
exports.sendAdminBasicReportAsCSV = functions.https.onRequest((req, res) => {
    console.log(req.params);
    const mailOptions = {
        from: '"Ervylove" <noreply@firebase.com>',
        to: req.params.email,
        subject: 'TEST EMAIL - DO NOT REPLY',
        text: 'This is a test. Do not pay attention to this.'
    };
    return mailTransport
        .sendMail(mailOptions)
        .then(() => console.log(`Email sent to ${req.params.email}`))
        .catch(error => console.error('There was an error while sending the email:', error));
});
//# sourceMappingURL=email.functions.js.map