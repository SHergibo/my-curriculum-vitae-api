const NodeMailer = require('./../../api/helpers/nodemailer.helper');

/**
* Send mail
*/
exports.send = async (req, res, next) => {
  try {
    const output = `
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
      `;

      NodeMailer.send(output, "Vous avez reçu un message sur votre site CV !", res);

  } catch (error) {
    next(error);
  }
};