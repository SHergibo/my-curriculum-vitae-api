const Express = require("express"),
  InfoController = require(`${process.cwd()}/api/controllers/info.controller`),
  uploadImgMiddleware = require("../../middlewares/uploadImg.middleware");

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
  .route("/prof-title-edit/:infoId/:profTitleId")
  .patch(authorize([ADMIN, LOGGED_USER]), InfoController.editProfTitle);

router
  .route("/prof-title-delete/:infoId/:profTitleId")
  .delete(authorize([ADMIN, LOGGED_USER]), InfoController.deleteProfTitle);

router
  .route("/prof-picture/:infoId")
  .patch(
    authorize([ADMIN, LOGGED_USER]),
    uploadImgMiddleware,
    InfoController.addProfPic
  );

router
  .route("/prof-picture-delete/:infoId/:profPicId")
  .delete(authorize([ADMIN, LOGGED_USER]), InfoController.deleteProfPic);

router.route("/image/:imgName").get(InfoController.findImg);

router
  .route("/:infoId")
  .patch(authorize([ADMIN, LOGGED_USER]), InfoController.update)
  .delete(authorize([ADMIN, LOGGED_USER]), InfoController.remove);

module.exports = router;
