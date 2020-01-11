const Express = require('express'),
      ExpeController = require(`${process.cwd()}/api/controllers/experience.controller`);

const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth.middleware');


const router = Express.Router();

router
    .route('/')
        .post(authorize([ADMIN, LOGGED_USER]), ExpeController.add);

router
    .route('/expe-list')
        .get(authorize([ADMIN, LOGGED_USER]), ExpeController.findAllQuery);

router
    .route('/:expeId')
        .get(authorize([ADMIN, LOGGED_USER]), ExpeController.findOne)
        .patch(authorize([ADMIN, LOGGED_USER]), ExpeController.update)
        .delete(authorize([ADMIN, LOGGED_USER]), ExpeController.remove);

module.exports = router;