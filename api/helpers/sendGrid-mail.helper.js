const {
    SendGridAPIKey,
    SendGridFrom,
    SendGridTemplateId,
  } = require("../../config/environment.config"),
  sgMail = require("@sendgrid/mail");

sgMail.setApiKey(SendGridAPIKey);

exports.sengGridEmail = async ({ to, dynamic_template_data }) => {
  try {
    const msg = {
      to,
      from: SendGridFrom,
      templateId: SendGridTemplateId,
      dynamic_template_data,
    };
    await sgMail.send(msg);
    return;
  } catch (error) {
    return error;
  }
};
