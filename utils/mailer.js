const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendPasswordResetEmail(email, resetLink) {
  await transporter.sendMail({
    to: email,
    from: 'no-reply@quotegenerator.com',
    subject: 'Password Reset',
    html: `<p>You requested a password reset</p><p>Click this <a href="${resetLink}">link</a> to reset your password</p>`,
  });
}

module.exports = { sendPasswordResetEmail };
