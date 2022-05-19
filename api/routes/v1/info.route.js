const Express = require("express"),
  InfoController = require(`${process.cwd()}/api/controllers/info.controller`),
  uploadImgMiddleware = require("../../middlewares/uploadImg.middleware");

const { authorize, ADMIN } = require("../../middlewares/auth.middleware");

const router = Express.Router();

router
  .route("/")
  .post(authorize([ADMIN]), InfoController.add)
  .get(InfoController.find);

router
  .route("/prof-title/:infoId")
  .patch(authorize([ADMIN]), InfoController.addProfTitle);

router
  .route("/prof-title-edit/:infoId/:profTitleId")
  .patch(authorize([ADMIN]), InfoController.editProfTitle);

router
  .route("/prof-title-delete/:infoId/:profTitleId")
  .delete(authorize([ADMIN]), InfoController.deleteProfTitle);

router
  .route("/prof-picture/:infoId")
  .patch(authorize([ADMIN]), uploadImgMiddleware, InfoController.addProfPic);

router
  .route("/prof-picture-delete/:infoId/:profPicId")
  .delete(authorize([ADMIN]), InfoController.deleteProfPic);

router.route("/image/:imgName").get(InfoController.findImg);

router
  .route("/:infoId")
  .patch(authorize([ADMIN]), InfoController.update)
  .delete(authorize([ADMIN]), InfoController.remove);

module.exports = router;
