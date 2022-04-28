const Express = require("express"),
  UserRoutes = require("./user.route"),
  MailRoutes = require("./mail.route"),
  InfoRoutes = require("./info.route"),
  EducExpeRoutes = require("./educationExperience.route"),
  SkillRoutes = require("./skill.route"),
  ProjectRoutes = require("./project.route"),
  AuthRoutes = require("./auth.route"),
  EmailAuthTokenRoutes = require("./emailAuthToken.route");
EmailResetPasswordAuthToken = require("./emailResetPasswordAuthToken.route");

const router = Express.Router();

router.use("/auth", AuthRoutes);
router.use("/email-auth", EmailAuthTokenRoutes);
router.use("/email-request-reset-password", EmailResetPasswordAuthToken);
router.use("/users", UserRoutes);
router.use("/mails", MailRoutes);
router.use("/infos", InfoRoutes);
router.use("/educs-exps", EducExpeRoutes);
router.use("/skills", SkillRoutes);
router.use("/projects", ProjectRoutes);

module.exports = router;
