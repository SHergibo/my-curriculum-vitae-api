const Express = require("express"),
  AuthController = require(`${process.cwd()}/api/controllers/auth.controller`),
  { authorize, ADMIN } = require("../../middlewares/auth.middleware");

const router = Express.Router();

router.route("/login").post(AuthController.login);

router.route("/refresh-token").post(AuthController.refresh);

router.route("/check-token").get(authorize([ADMIN]), (req, res, next) => {
  return res.status(204).send();
});

router.route("/logout").post(AuthController.logout);

module.exports = router;
