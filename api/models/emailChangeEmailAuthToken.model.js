const Mongoose = require("mongoose"),
  Crypto = require("crypto"),
  Moment = require("moment-timezone"),
  { UrlEmail } = require("../../config/environment.config"),
  { sengGridEmail } = require("./../helpers/sendGrid-mail.helper");

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
  newUserEmail: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

schema.statics.generate = async function (userId, newUserEmail) {
  const tokenObject = new emailChangeEmailAuthToken();
  tokenObject.token = `${Crypto.randomBytes(40).toString("hex")}`;
  tokenObject.userId = userId;
  tokenObject.newUserEmail = newUserEmail;
  tokenObject.expires = Moment().add(30, "minutes").toDate();
  await tokenObject.save();

  const dynamic_template_data = {
    subject: "Confirmation changement de votre email !",
    title: "Confirmation changement de votre email !",
    text: `Cliquez sur le lien ci-dessous pour confirmer le changement de votre email. Si vous n'avez pas fait cette demande de changement d'email, ne partagez pas et ne cliquez pas sur lien ci-dessous !`,
    url: `${UrlEmail}/update-email/${tokenObject.token}`,
    urlText: "Confirmer le changement de votre email !",
  };

  await sengGridEmail({ to: newUserEmail, dynamic_template_data });
};

const emailChangeEmailAuthToken = Mongoose.model(
  "EmailChangeEmailAuthToken",
  schema
);

module.exports = emailChangeEmailAuthToken;
