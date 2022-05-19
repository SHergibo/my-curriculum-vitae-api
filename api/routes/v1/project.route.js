const Express = require("express"),
  ProjectController = require(`${process.cwd()}/api/controllers/project.controller`);

const { authorize, ADMIN } = require("../../middlewares/auth.middleware");

const uploadImgsMiddleware = require("../../middlewares/uploadImages.middleware");

const router = Express.Router();

router
  .route("/")
  .post(authorize([ADMIN]), uploadImgsMiddleware, ProjectController.add);

router
  .route("/:projectId")
  .patch(authorize([ADMIN]), uploadImgsMiddleware, ProjectController.update)
  .delete(authorize([ADMIN]), ProjectController.remove);

router.route("/projects-list").get(ProjectController.findAll);

router.route("/image/:imgName").get(ProjectController.findImg);

router.route("/pagination").get(ProjectController.findPaginate);

module.exports = router;
