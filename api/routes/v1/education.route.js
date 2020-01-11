const Express = require('express'),
      EducController = require(`${process.cwd()}/api/controllers/education.controller`);

const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth.middleware');


const router = Express.Router();

router
    .route('/')
        .post(authorize([ADMIN, LOGGED_USER]), EducController.add);

router
    .route('/educ-list')
        .get(authorize([ADMIN, LOGGED_USER]), EducController.findAllQuery);

router
    .route('/:educId')
        .get(authorize([ADMIN, LOGGED_USER]), EducController.findOne)
        .patch(authorize([ADMIN, LOGGED_USER]), EducController.update)
        .delete(authorize([ADMIN, LOGGED_USER]), EducController.remove);

module.exports = router;