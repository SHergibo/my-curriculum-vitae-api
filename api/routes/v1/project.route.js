const Express = require('express'),
      ProjectController = require(`${process.cwd()}/api/controllers/project.controller`);

const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth.middleware');


const router = Express.Router();

router
    .route('/')
        .post(authorize([ADMIN, LOGGED_USER]), ProjectController.add)
        .get(ProjectController.find);

router
    .route('/:projectId')
        .patch(authorize([ADMIN, LOGGED_USER]), ProjectController.update)
        .delete( ProjectController.remove); //TO DO remettre authorize

router
    .route('/image/:imgName')
        .get(ProjectController.findImg);

module.exports = router;