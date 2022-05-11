const User = require("./../models/user.model"),
  { sengGridEmail } = require("./../helpers/sendGrid-mail.helper");

/**
 * Send mail
 */
exports.send = async (req, res, next) => {
  try {
    const user = await User.find({});

    const dynamic_template_data = {
      subject: "Vous avez reçu un message sur votre site CV !",
      title: "Vous avez reçu un message sur votre site CV !",
      text: `
      <h3>Détails du message</h3>
      <p>Nom : ${req.body.lastname} ${req.body.firstname}</p>
      <p>N° de téléphone : ${req.body.phone}</p>
      <p>Email : ${req.body.email}</p>
      <p>Sujet : ${req.body.subject}</p>
      <h3>Message</h3>
      ${req.body.message}`,
    };

    await sengGridEmail({ to: user[0].email, dynamic_template_data });

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
