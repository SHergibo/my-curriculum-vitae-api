const User = require("./../models/user.model"),
  { SendGridAPIKey, SendGridFrom } = require("../../config/environment.config"),
  sgMail = require("@sendgrid/mail");

sgMail.setApiKey(SendGridAPIKey);

/**
 * Send mail
 */
exports.send = async (req, res, next) => {
  try {
    const user = await User.find({});
    const msg = {
      to: user[0].email,
      from: SendGridFrom,
      subject: "Vous avez reçu un message sur votre site CV !",
      html: `
      <p>You have a new contact request</p>
      <h3>Contact details</h3>
      <ul>
          <li>Name : ${req.body.lastname} ${req.body.firstname}</li>
          <li>Phone number : ${req.body.phone}</li>
          <li>Email : ${req.body.email}</li>
          <li>Subject : ${req.body.subject}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
      `,
    };
    await sgMail.send(msg);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
