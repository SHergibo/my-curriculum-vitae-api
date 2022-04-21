const Express = require("express"),
  EmailAuthToken = require(`${process.cwd()}/api/controllers/emailAuthToken.controller`);

const router = Express.Router();

router.route("/").post(EmailAuthToken.createNewEmailAuthToken);

router.route("/:tokenId").patch(EmailAuthToken.updateAuthEmailToken);

module.exports = router;
