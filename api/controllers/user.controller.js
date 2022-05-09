const User = require("./../models/user.model"),
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
 * PATCH user
 */
exports.update = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      override: true,
      upsert: true,
      new: true,
    });
    return res.json(user.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(err));
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
