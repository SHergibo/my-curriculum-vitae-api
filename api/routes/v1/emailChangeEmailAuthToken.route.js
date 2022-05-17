const Express = require("express"),
  EmailChangeEmailAuthToken = require(`${process.cwd()}/api/controllers/emailChangeEmailAuthToken.controller`);

const router = Express.Router();

router
  .route("/:tokenId")
  .patch(EmailChangeEmailAuthToken.updateAuthChangeEmailToken);

module.exports = router;
