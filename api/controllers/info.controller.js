const Info = require("./../models/info.model"),
  Boom = require("@hapi/boom"),
  mongoose = require("mongoose");

/**
 * Post info
 */
exports.add = async (req, res, next) => {
  try {
    let dataUserId = req.body;
    dataUserId.userId = req.user._id;
    const info = new Info(dataUserId);
    await info.save();
    return res.json(info.transformInfo());
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * Patch info with profession title
 */
exports.addProfTitle = async (req, res, next) => {
  try {
    const info = await Info.findById(req.params.infoId);
    let profTitleArray = info.professionTitles;
    req.body.id = mongoose.Types.ObjectId();
    if (profTitleArray.length >= 1) {
      profTitleArray = [...profTitleArray, req.body];
    } else {
      profTitleArray = [req.body];
    }

    const updatedInfo = await Info.findByIdAndUpdate(
      req.params.infoId,
      { professionTitles: profTitleArray },
      {
        new: true,
      }
    );
    return res.json(updatedInfo.professionTitles);
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * Patch profession title
 */
exports.editProfTitle = async (req, res, next) => {
  try {
    const info = await Info.findById(req.params.infoId);
    let profTitleArray = info.professionTitles;
    let indexToEdit = profTitleArray.findIndex(
      (profTitle) => profTitle.id.toString() === req.params.profTitleId
    );
    profTitleArray[indexToEdit] = {
      nameProfessionTitle: req.body.nameProfessionTitle,
      fontAwesomeIcon: req.body.fontAwesomeIcon,
      svgIconProfTitle: req.body.svgIconProfTitle,
      id: profTitleArray[indexToEdit].id,
    };

    const updatedInfo = await Info.findByIdAndUpdate(
      req.params.infoId,
      { professionTitles: profTitleArray },
      {
        new: true,
      }
    );
    return res.json(updatedInfo.professionTitles);
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * DELETE info profession title
 */
exports.deleteProfTitle = async (req, res, next) => {
  try {
    const info = await Info.findById(req.params.infoId);
    let profTitleArray = info.professionTitles;
    profTitleArray = [...profTitleArray].filter(
      (item) => item._id.toString() !== req.params.profTitleId
    );
    const updatedInfo = await Info.findByIdAndUpdate(
      req.params.infoId,
      { professionTitles: profTitleArray },
      {
        new: true,
      }
    );
    return res.json(updatedInfo.professionTitles);
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * GET info
 */
exports.find = async (req, res, next) => {
  try {
    const info = await Info.findOne();
    if (info) {
      return res.json(info.transformInfo());
    } else {
      return res.json(info);
    }
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * PATCH info
 */
exports.update = async (req, res, next) => {
  try {
    const info = await Info.findByIdAndUpdate(req.params.infoId, req.body, {
      new: true,
    });
    return res.json(info.transformInfo());
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * DELETE info
 */
exports.remove = async (req, res, next) => {
  try {
    const info = await Info.findByIdAndDelete(req.params.infoId);
    return res.json(info);
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};
