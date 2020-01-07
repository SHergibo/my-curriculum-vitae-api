const Express = require('express'),
      MailController = require(`${process.cwd()}/api/controllers/mail.controller`);

const router = Express.Router();

router
    .route('/')
        .post(MailController.send);

module.exports = router;