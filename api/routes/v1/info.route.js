const Express = require('express'),
      InfoController = require(`${process.cwd()}/api/controllers/info.controller`);

const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth.middleware');


const router = Express.Router();

router
    .route('/')
        .post(authorize([ADMIN, LOGGED_USER]), InfoController.add)
        .get(authorize([ADMIN, LOGGED_USER]), InfoController.find);

router
    .route('/:infoId')
        .patch(authorize([ADMIN, LOGGED_USER]), InfoController.update);

module.exports = router;