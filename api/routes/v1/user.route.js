const Express = require("express"),
  UserController = require(`${process.cwd()}/api/controllers/user.controller`);

const {
  authorize,
  ADMIN,
  LOGGED_USER,
} = require("../../middlewares/auth.middleware");

const router = Express.Router();

router.route("/").post(UserController.add).get(UserController.checkUserExist);

router
  .route("/updatePassword/:userId")
  .patch(authorize([ADMIN, LOGGED_USER]), UserController.updatePassword);

router
  .route("/updateEmail/:userId")
  .patch(authorize([ADMIN, LOGGED_USER]), UserController.updateEmail);

router
  .route("/:userId")
  .get(authorize([ADMIN, LOGGED_USER]), UserController.findOne)
  .delete(authorize([ADMIN, LOGGED_USER]), UserController.remove);

module.exports = router;
