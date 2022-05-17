const EmailChangeEmailAuthToken = require("../models/emailChangeEmailAuthToken.model"),
  Boom = require("@hapi/boom"),
  User = require("../models/user.model"),
  Moment = require("moment-timezone");

/**
 * PATCH email auth token
 */
exports.updateAuthChangeEmailToken = async (req, res, next) => {
  try {
    let findTokenAuth = await EmailChangeEmailAuthToken.findOne({
      token: req.params.tokenId,
    });
    if (!findTokenAuth) {
      return next(Boom.notFound("Ce token de vérification n'existe pas !"));
    }
    if (findTokenAuth.expires < Moment().toDate()) {
      return next(Boom.unauthorized("Ce token de vérification a expiré !"));
    } else {
      let token = await EmailChangeEmailAuthToken.findOneAndDelete({
        token: req.params.tokenId,
      });
      let user = await User.findByIdAndUpdate(token.userId, {
        email: token.newUserEmail,
      });
      return res.json(user.transform());
    }
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};
