const Express = require('express'),
  ProjectController = require(`${process.cwd()}/api/controllers/project.controller`);

const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth.middleware');


const router = Express.Router();

router
  .route('/')
    .post(authorize([ADMIN, LOGGED_USER]), ProjectController.add);

router
  .route('/:projectId')
    .patch(authorize([ADMIN, LOGGED_USER]), ProjectController.update)
    .delete(authorize([ADMIN, LOGGED_USER]), ProjectController.remove);

router
  .route('/project-list')
    .get(ProjectController.findAll);

router
  .route('/image/:imgName')
    .get(ProjectController.findImg);

router
  .route('/pagination')
    .get(ProjectController.findPaginate);

module.exports = router;