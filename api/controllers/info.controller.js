const Info = require("./../models/info.model"),
  Project = require("./../models/project.model"),
  EducExpe = require("./../models/educationExperience.model"),
  Skill = require("./../models/skill.model"),
  Boom = require("@hapi/boom"),
  mongoose = require("mongoose");

const { mongo } = require("./../../config/environment.config");

/**
 * Post info
 */
exports.add = async (req, res, next) => {
  try {
    let dataUserId = req.body;
    dataUserId.userId = req.user._id;
    const info = new Info(dataUserId);
    await info.save();

    let totalProject = await Project.countDocuments();

    if (totalProject >= 1) info.hasPortfolio = true;

    let totalSkill = await Skill.countDocuments();
    let totalEducExpe = await EducExpe.countDocuments();

    if (totalSkill >= 1 || totalEducExpe >= 1) info.hasResume = true;

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
    req.body.id = mongoose.Types.ObjectId();
    info.professionTitles.push(req.body);

    const updatedInfo = await info.save();
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

    const updatedInfo = await info.save();
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
      (item) => item.id.toString() !== req.params.profTitleId
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
 * Patch info with profile picture
 */
exports.addProfPic = async (req, res, next) => {
  try {
    const info = await Info.findById(req.params.infoId);
    let altDescProfPic = JSON.parse(req.body.profilePicAlt);

    if (req.file && !altDescProfPic) {
      const conn = mongoose.createConnection(mongo.uri, {});

      let gridFSBucket;
      conn.once("open", () => {
        gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
          bucketName: "images",
        });
        gridFSBucket.delete(new mongoose.Types.ObjectId(req.file.id));
      });
      return next(
        Boom.badRequest("Il faut une description pour votre photo de profil !")
      );
    }

    if (info?.profilePic?.id) {
      let oldImgId = info.profilePic.id;
      const conn = mongoose.createConnection(mongo.uri, {});

      let gridFSBucket;
      conn.once("open", () => {
        gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
          bucketName: "images",
        });
        gridFSBucket.delete(new mongoose.Types.ObjectId(oldImgId));
      });
    }

    info.profilePic = {
      fileName: req.file.filename,
      alt: altDescProfPic,
      id: req.file.id,
    };

    const updatedInfo = await info.save();
    return res.json(updatedInfo.profilePic);
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * GET profile picture img
 */
exports.findImg = async (req, res, next) => {
  try {
    const conn = mongoose.createConnection(mongo.uri, {});

    let gridFSBucket;
    conn.once("open", () => {
      gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "images",
      });
      res.header("Content-Type", "image/webp");
      gridFSBucket
        .openDownloadStreamByName(req.params.imgName)
        .on("error", (error) => {
          res.json(Boom.notFound(`Cette image n'existe pas !`));
          return;
        })
        .pipe(res);
    });
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * DELETE info profile picture
 */
exports.deleteProfPic = async (req, res, next) => {
  try {
    const info = await Info.findById(req.params.infoId);
    info.profilePic = {};

    await Info.findByIdAndUpdate(req.params.infoId, info, {
      new: true,
    });

    const conn = mongoose.createConnection(mongo.uri, {});

    let gridFSBucket;
    conn.once("open", () => {
      gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "images",
      });
      gridFSBucket.delete(new mongoose.Types.ObjectId(req.params.profPicId));
    });
    return res.status(204).send();
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

    let totalProject = await Project.countDocuments();

    if (totalProject >= 1) info.hasPortfolio = true;

    let totalSkill = await Skill.countDocuments();
    let totalEducExpe = await EducExpe.countDocuments();

    if (totalSkill >= 1 || totalEducExpe >= 1) info.hasResume = true;

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
