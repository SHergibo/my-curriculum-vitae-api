const Express = require('express'),
      EducExpeController = require(`${process.cwd()}/api/controllers/educationExperience.controller`);

const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth.middleware');


const router = Express.Router();

router
    .route('/')
        .post(authorize([ADMIN, LOGGED_USER]), EducExpeController.add);

router
    .route('/educExpe-list')
        .get(authorize([ADMIN, LOGGED_USER]), EducExpeController.findAllQuery);

router
    .route('/:educExpeId')
        .get(authorize([ADMIN, LOGGED_USER]), EducExpeController.findOne)
        .patch(authorize([ADMIN, LOGGED_USER]), EducExpeController.update)
        .delete(authorize([ADMIN, LOGGED_USER]), EducExpeController.remove);

module.exports = router;