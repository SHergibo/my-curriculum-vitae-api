const Express = require("express"),
  UserController = require(`${process.cwd()}/api/controllers/user.controller`);

const { authorize, ADMIN } = require("../../middlewares/auth.middleware");

const router = Express.Router();

router.route("/").post(UserController.add).get(UserController.checkUserExist);

router
  .route("/updatePassword/:userId")
  .patch(authorize([ADMIN]), UserController.updatePassword);

router
  .route("/updateEmail/:userId")
  .patch(authorize([ADMIN]), UserController.updateEmail);

router
  .route("/:userId")
  .get(authorize([ADMIN]), UserController.findOne)
  .delete(authorize([ADMIN]), UserController.remove);

module.exports = router;
