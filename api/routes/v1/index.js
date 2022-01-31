const Express = require("express"),
  UserRoutes = require("./user.route"),
  MailRoutes = require("./mail.route"),
  InfoRoutes = require("./info.route"),
  EducExpeRoutes = require("./educationExperience.route"),
  SkillRoutes = require("./skill.route"),
  ProjectRoutes = require("./project.route"),
  AuthRoutes = require("./auth.route"),
  TokenAuthRoutes = require("./token-auth.route");

const router = Express.Router();

router.get("/status", (req, res) => res.send(200));

router.use("/auth", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/mail", MailRoutes);
router.use("/info", InfoRoutes);
router.use("/educExpe", EducExpeRoutes);
router.use("/skill", SkillRoutes);
router.use("/project", ProjectRoutes);

module.exports = router;
