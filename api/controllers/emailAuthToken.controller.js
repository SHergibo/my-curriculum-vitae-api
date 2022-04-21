const EmailAuthToken = require("../models/emailAuthToken.model"),
  Boom = require("@hapi/boom"),
  User = require("../models/user.model"),
  Moment = require("moment-timezone");

/**
 * POST email auth token
 */
exports.createNewEmailAuthToken = async (req, res, next) => {
  try {
    let expiredToken = await EmailAuthToken.findOne({ token: req.body.email });
    let user = await User.findById(expiredToken.userId);
    await EmailAuthToken.findByIdAndDelete(expiredToken.id);
    await EmailAuthToken.generate(user);

    return res.status(204).send();
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * PATCH email auth token
 */
exports.updateAuthEmailToken = async (req, res, next) => {
  try {
    let findTokenAuth = await EmailAuthToken.findOne({
      token: req.params.tokenId,
    });
    if (findTokenAuth.expires < Moment().toDate()) {
      return Boom.unauthorized("Verification token expired !");
    } else {
      let token = await EmailAuthToken.findOneAndDelete({
        token: req.params.tokenId,
      });
      await User.findByIdAndUpdate(token.userId, {
        emailAuth: true,
      });
      return res.status(204).send();
    }
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};
