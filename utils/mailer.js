const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');


const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const handlebarOptions = {
  viewEngine: {
      extName: '.hbs',
      partialsDir: path.resolve('./emailTemplates'),
      defaultLayout: false,
  },
  viewPath: path.resolve('./emailTemplates'),
  extName: '.hbs',
};

transporter.use('compile', hbs(handlebarOptions));

module.exports = transporter;