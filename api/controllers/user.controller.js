const User = require("./../models/user.model"),
  EmailChangeEmailAuthToken = require("../models/emailChangeEmailAuthToken.model"),
  Boom = require("@hapi/boom"),
  EmailAuthToken = require("../models/emailAuthToken.model");

/**
 * Post one user
 */
exports.add = async (req, res, next) => {
  try {
    const findAdminUser = await User.findOne({ role: "admin" });
    if (findAdminUser) {
      return next(
        Boom.unauthorized(
          "Il existe déjà un compte authentifié, vous ne pouvez pas créer un second compte !"
        )
      );
    }

    const findGhostUser = await User.findOne({ role: "ghost" });
    if (findGhostUser) {
      await User.findByIdAndDelete(findGhostUser._id);
      await EmailAuthToken.findOneAndDelete({ userId: findGhostUser._id });
    }

    const user = new User(req.body);
    await user.save();
    await EmailAuthToken.generate(user);
    return res.status(204).send();
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * GET one user
 */
exports.findOne = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    return res.json(user.transform());
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * GET Check if a user exist
 */
exports.checkUserExist = async (req, res, next) => {
  try {
    const user = await User.findOne({ role: "admin" });
    let userExist = false;
    if (user) userExist = true;

    return res.json({ userExist });
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * PATCH user password
 */
exports.updatePassword = async (req, res, next) => {
  try {
    let passwordDataObject = {
      actualPassword: req.body.actualPassword,
      newPassword: req.body.newPassword,
      confirmPassword: req.body.confirmPassword,
    };
    await User.findByIdAndUpdate(req.params.userId, passwordDataObject, {
      new: true,
    });
    return res.status(204).send();
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * PATCH user email
 */
exports.updateEmail = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (user.email === req.body.email.toLowerCase()) {
      return next(Boom.conflict("Cette email existe déjà !"));
    }

    const changeEmailToken = await EmailChangeEmailAuthToken.findOne({
      userId: req.params.userId,
    });

    if (changeEmailToken) {
      await EmailChangeEmailAuthToken.findByIdAndDelete(changeEmailToken._id);
    }

    await EmailChangeEmailAuthToken.generate(req.params.userId, req.body.email);

    return res.status(204).send();
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * DELETE user
 */
exports.remove = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    return res.json(user.transform());
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};
