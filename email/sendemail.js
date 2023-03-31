var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'binhthienlongphao@gmail.com',
    pass: 'Anhdat1234567'
  }
});

var mailOptions = {
  from: 'binhthienlongphao@gmail.com',
  to: 'jackspa0709@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});