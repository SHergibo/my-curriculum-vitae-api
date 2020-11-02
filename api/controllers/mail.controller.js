const Mail = require('./../models/mail.model'),
      NodeMailer = require('nodemailer'),
      config = require('./../../config/secrets'),
      { google } = require('googleapis'),
      { OAuth2 } = google.auth,
      OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

/**
* Send mail
*/
exports.send = async (req, res, next) => {
  const { MAIL, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = config;

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
    
    const oauth2Client = new OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      OAUTH_PLAYGROUND
    );

    oauth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN,
    });
    const accessToken = oauth2Client.getAccessToken();

    let transporter = NodeMailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: MAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      }
    });


    let mailOptions = {
      from: `"Site web cv" <${MAIL}>`,
      to: `${MAIL}`,
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