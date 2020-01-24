const Express = require('express'),
      SkillController = require(`${process.cwd()}/api/controllers/skill.controller`);

const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth.middleware');


const router = Express.Router();

router
    .route('/')
        .post(authorize([ADMIN, LOGGED_USER]), SkillController.add);

router
    .route('/skill-list')
        .get(authorize([ADMIN, LOGGED_USER]), SkillController.findAllQuery);

router
    .route('/:skillId')
        .get(authorize([ADMIN, LOGGED_USER]), SkillController.findOne)
        .patch(authorize([ADMIN, LOGGED_USER]), SkillController.update)
        .delete(authorize([ADMIN, LOGGED_USER]), SkillController.remove);

module.exports = router;