const EmailAuthToken = require("../models/emailAuthToken.model"),
  Boom = require("@hapi/boom"),
  User = require("../models/user.model"),
  Moment = require("moment-timezone");

/**
 * POST create new email auth token
 */
exports.createNewEmailAuthToken = async (req, res, next) => {
  try {
    let expiredToken = await EmailAuthToken.findOne({
      userEmail: req.body.email,
    });

    if (!expiredToken) {
      return next(Boom.notFound("Cette adresse mail n'existe pas !"));
    }
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
    if (!findTokenAuth) {
      return next(Boom.notFound("Ce token de vérification n'existe pas !"));
    }
    if (findTokenAuth.expires < Moment().toDate()) {
      return next(Boom.unauthorized("Ce token de vérification a expiré !"));
    } else {
      let token = await EmailAuthToken.findOneAndDelete({
        token: req.params.tokenId,
      });
      await User.findByIdAndUpdate(token.userId, {
        role: "admin",
      });
      return res.status(204).send();
    }
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};
