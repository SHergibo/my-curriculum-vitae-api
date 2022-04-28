const Mongoose = require("mongoose"),
  Crypto = require("crypto"),
  Moment = require("moment-timezone"),
  {
    SendGridAPIKey,
    SendGridFrom,
    UrlEmail,
  } = require("../../config/environment.config"),
  sgMail = require("@sendgrid/mail");

sgMail.setApiKey(SendGridAPIKey);

let Schema = Mongoose.Schema;

let schema = new Schema({
  token: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userEmail: {
    type: String,
    ref: "User",
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

schema.statics.generate = async function (user) {
  const tokenObject = new emailResetPasswordAuthToken();
  tokenObject.token = `${Crypto.randomBytes(40).toString("hex")}`;
  tokenObject.userId = user._id;
  tokenObject.userEmail = user.email;
  tokenObject.expires = Moment().add(10, "minutes").toDate();
  await tokenObject.save();

  const msg = {
    to: user.email,
    from: SendGridFrom,
    subject: "Requête changement de mot de passe !",
    html: `
      <h2>Requête changement de mot de passe !</h2>
      <p>Cliquez sur le lien ci-dessous pour pouvoir changer votre mot de passe.<p>
      <a href="${UrlEmail}/reset-password/${tokenObject.token}">Changer votre mot de passe !</a>
      `,
  };
  await sgMail.send(msg);
};

const emailResetPasswordAuthToken = Mongoose.model(
  "EmailResetPasswordAuthToken",
  schema
);

module.exports = emailResetPasswordAuthToken;