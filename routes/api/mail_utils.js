'use strict';

var loopback = require('loopback');
var EmailTemplates = require('swig-email-templates');
var app = loopback();
var templates = new EmailTemplates({
  root: './routes/api/email_templates',
});

var _this = {
  sendEmail: function (to_address, subject_line, mailContent) {
    loopback.Email.send({
      to: to_address,
      from: 'no-reply@taskapp.com',
      subject: subject_line,
      html: mailContent,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  },

  sendEmailWithTemplate: function (
    template_name,
    to_address,
    subject_line,
    context,
  ) {
    templates.render(template_name, context, function (err, result) {
      if (err) console.log(err);
      else {
        _this.sendEmail(to_address, subject_line, result);
      }
    });
  },
};

module.exports = _this;
