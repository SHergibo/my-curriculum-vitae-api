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
  const tokenObject = new emailAuthToken();
  tokenObject.token = `${Crypto.randomBytes(40).toString("hex")}`;
  tokenObject.userId = user._id;
  tokenObject.userEmail = user.email;
  tokenObject.expires = Moment().add(5, "minutes").toDate();
  await tokenObject.save();

  const msg = {
    to: user.email,
    from: SendGridFrom,
    templateId: "d-c916190fbc6d437397741713238d8688",
    dynamic_template_data: {
      subject: "Authentification de votre compte !",
      title: "Authentification de votre compte ! - votre CV en ligne",
      text: `<p>Cliquez sur le lien ci-dessous pour authentifier votre compte.<p>
             <p>Si vous n'avez pas créé de compte sur <a href="${UrlEmail}">${UrlEmail}</a>, ne partagez pas et ne cliquez pas sur le lien ci-dessous !</p>`,
      url: `${UrlEmail}/email-auth/${tokenObject.token}`,
      urlText: "Authentifier votre compte !",
    },
  };
  await sgMail.send(msg);
};

const emailAuthToken = Mongoose.model("EmailAuthToken", schema);

module.exports = emailAuthToken;
