/**
 * Created by assafgannon on 3/12/15.
 */

'use strict';

var nodemailer = require('nodemailer');
var local = require('../../config/local.env');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: 'Gmail',
    auth: local.email.auth
});


module.exports = (function () {
  return {
    sendEmail: function (to, name, attachment, callback) {
      var mailOptions = {
        from: 'tikalk.teq@gmail.com', // sender address
        to: to,
        subject: 'TEQ Questionnaire', // Subject line
        html: '<h1>TEQ Questionnaire</h1><b>Name: <u>'+name+'</u></b>', // html body
        attachments: {   // file on disk as an attachment
          path: attachment // stream this file
        }
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, callback);
    }
  }
})();
