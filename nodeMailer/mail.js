const nodemailer = require("nodemailer");

require("dotenv").config();

const config = {
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(config);

const sendVerifyToken = async (token, email) => {
  const emailOptions = {
    from: "'MathInc Company'  <matinc@feelfree.com>",
    to: email,
    subject: "Please verify your email",
    text: `Hello, click here to verify your email: http://localhost:8000/api/users/verify/${token}`,
  };

  return await transporter.sendMail(emailOptions);
};

const sendVerificationConfirmed = async (email) => {
  const emailOptions = {
    from: "'MathInc Company'  <matinc@feelfree.com>",
    to: email,
    subject: "Email verified successfully!",
    text: "Thank you! Your email has been verified!",
  };
  return await transporter.sendMail(emailOptions);
};

module.exports = { sendVerifyToken, sendVerificationConfirmed };
