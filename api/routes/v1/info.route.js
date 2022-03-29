const Express = require("express"),
  InfoController = require(`${process.cwd()}/api/controllers/info.controller`);

const {
  authorize,
  ADMIN,
  LOGGED_USER,
} = require("../../middlewares/auth.middleware");

const router = Express.Router();

router
  .route("/")
  .post(authorize([ADMIN, LOGGED_USER]), InfoController.add)
  .get(InfoController.find);

router
  .route("/prof-title/:infoId")
  .patch(authorize([ADMIN, LOGGED_USER]), InfoController.addProfTitle);

router
  .route("/prof-title-delete/:infoId/:profTitleId")
  .delete(authorize([ADMIN, LOGGED_USER]), InfoController.deleteProfTitle);

router
  .route("/:infoId")
  .patch(authorize([ADMIN, LOGGED_USER]), InfoController.update)
  .delete(authorize([ADMIN, LOGGED_USER]), InfoController.remove);

module.exports = router;
