const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function sendRegistrationEmail(to, name) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Registration Successful - FitCheck',
    html: `<h2>Hello ${name},</h2><p>You have successfully registered in FitCheck.</p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log('Email error:', err);
    else console.log('Email sent:', info.response);
  });
}

module.exports = sendRegistrationEmail;
