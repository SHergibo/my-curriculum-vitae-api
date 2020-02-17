const Mail = require('./../models/mail.model'),
      NodeMailer = require('nodemailer');
      config = require('./../../config/secrets');

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

    let transporter = NodeMailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      auth: {
        user: config.mail,
        pass: config.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    });


    let mailOptions = {
      from: `"Site web cv" <${config.mail}>`,
      to: `${config.mail}`,
      subject: 'Message received',
      text: 'Hello world?',
      html: output
    };

    transporter.sendMail(mailOptions, (error, info) => {
      
      if (error) {
        return error;
      }else{
        return res.json({status : "200"});
      }
    });

  } catch (error) {
    next(error);
  }
};