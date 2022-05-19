const Express = require("express"),
  SkillController = require(`${process.cwd()}/api/controllers/skill.controller`);

const { authorize, ADMIN } = require("../../middlewares/auth.middleware");

const router = Express.Router();

router.route("/").post(authorize([ADMIN]), SkillController.add);

router.route("/skills-list").get(SkillController.findAll);

router
  .route("/:skillId")
  .get(authorize([ADMIN]), SkillController.findOne)
  .patch(authorize([ADMIN]), SkillController.update)
  .delete(authorize([ADMIN]), SkillController.remove);

module.exports = router;
