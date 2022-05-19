const Express = require("express"),
  EducExpeController = require(`${process.cwd()}/api/controllers/educationExperience.controller`);

const { authorize, ADMIN } = require("../../middlewares/auth.middleware");

const router = Express.Router();

router.route("/").post(authorize([ADMIN]), EducExpeController.add);

router.route("/educs-exps-list").get(EducExpeController.findAll);

router
  .route("/:educExpeId")
  .get(authorize([ADMIN]), EducExpeController.findOne)
  .patch(authorize([ADMIN]), EducExpeController.update)
  .delete(authorize([ADMIN]), EducExpeController.remove);

module.exports = router;
