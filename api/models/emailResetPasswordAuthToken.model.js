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
    templateId: "d-9b0d1c9ef5d04f4ba4a2cb5b8e71b913",
    dynamic_template_data: {
      subject: "Requête changement de mot de passe !",
      title: "Requête changement de mot de passe ! - votre CV en ligne",
      text: `<p>Cliquez sur le lien ci-dessous pour pouvoir changer votre mot de passe.<p>
             <p>Si vous n'avez pas fait cette demande de changement de mot de passe, ne partagez pas et ne cliquez pas sur lien ci-dessous !</p>`,
      url: `${UrlEmail}/reset-password/${tokenObject.token}`,
      urlText: "Changer votre mot de passe !",
    },
    // html: `
    //   <div class="title">
    //     <h2>Requête changement de mot de passe ! - votre CV en ligne</h2>
    //   </div>
    //   <section>
    //     <p>Cliquez sur le lien ci-dessous pour pouvoir changer votre mot de passe.<p>
    //     <p>Si vous n'avez pas fait cette demande de changement de mot de passe, ne partagez pas et ne cliquez pas sur lien ci-dessous !</p>
    //     <a class="linkTo" href="${UrlEmail}/reset-password/${tokenObject.token}">Changer votre mot de passe !</a>
    //   </section>
    //   `,
  };
  await sgMail.send(msg);
};

// {/* <div class="title">
//   <h2>Requête changement de mot de passe !</h2>
// </div>
// <section>
//     <p>Cliquez sur le lien ci-dessous pour pouvoir changer votre mot de passe.<p>
//     <p>Si vous n'avez pas fait cette demande de changement de mot de passe, ne partagez pas et ne cliquez pas sur lien ci-dessous !</p>
//   <a class="linkTo" href={{url}}>Changer votre mot de passe !</a>
// </section> */}

const emailResetPasswordAuthToken = Mongoose.model(
  "EmailResetPasswordAuthToken",
  schema
);

module.exports = emailResetPasswordAuthToken;
