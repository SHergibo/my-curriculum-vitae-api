const Project = require("./../models/project.model"),
  Boom = require("@hapi/boom");

const mongoose = require("mongoose");
const { mongo } = require("./../../config/environment.config");

/**
 * Post project
 */
exports.add = async (req, res, next) => {
  try {
    let projectData = req.body;
    let altDescImages = JSON.parse(req.body.altDescImages);
    projectData.userId = req.user._id;
    projectData.images = [];
    req.files.forEach((image, index) => {
      projectData.images = [
        ...projectData.images,
        {
          fileName: image.filename,
          alt: altDescImages[index],
          id: image.id,
        },
      ];
    });
    projectData.technoUsedFront = JSON.parse(req.body.technoUsedFront);
    projectData.technoUsedBack = JSON.parse(req.body.technoUsedBack);
    const project = new Project(projectData);
    await project.save();
    return res.json(project.transformProject());
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * GET all project
 */
exports.findAll = async (req, res, next) => {
  try {
    const project = await Project.find();
    const fields = [
      "_id",
      "projectName",
      "description",
      "images",
      "technoUsedFront",
      "technoUsedBack",
      "urlWeb",
      "urlGithub",
    ];
    let arraySkillTransformed = [];
    project.forEach((item) => {
      const object = {};
      fields.forEach((field) => {
        object[field] = item[field];
      });
      arraySkillTransformed.push(object);
    });
    return res.json(arraySkillTransformed);
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * GET project list with pagination
 */
exports.findPaginate = async (req, res, next) => {
  try {
    const page = req.query.page;
    const pageSize = 6;

    const totalData = await Project.countDocuments();

    const project = await Project.find()
      .skip(page * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .lean();

    project.forEach((element) => {
      element.pageIndex = parseInt(page);
    });

    const fields = [
      "_id",
      "projectName",
      "description",
      "images",
      "technoUsedFront",
      "technoUsedBack",
      "urlWeb",
      "urlGithub",
      "pageIndex",
    ];
    let arraySkillTransformed = [];
    project.forEach((item) => {
      const object = {};
      fields.forEach((field) => {
        object[field] = item[field];
      });
      arraySkillTransformed.push(object);
    });
    return res.json({ arrayData: arraySkillTransformed, totalData });
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * GET project img
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
      gridFSBucket.openDownloadStreamByName(req.params.imgName).pipe(res);
    });
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * PATCH project
 */
exports.update = async (req, res, next) => {
  try {
    let body = req.body;
    let altDescImages = JSON.parse(req.body.altDescImages);
    body.technoUsedFront = JSON.parse(req.body.technoUsedFront);
    body.technoUsedBack = JSON.parse(req.body.technoUsedBack);
    const oldProject = await Project.findById(req.params.projectId);
    let imagesToDelete = oldProject.images;

    if (body.images) {
      let updatedImagesArray = [];
      if (body.images.constructor.toString().indexOf("String") > -1) {
        body.images = [body.images];
      }
      body.images.forEach((imageName) => {
        updatedImagesArray = [
          ...updatedImagesArray,
          oldProject.images.filter(
            (images) => images.fileName === imageName
          )[0],
        ];

        imagesToDelete = imagesToDelete.filter(
          (images) => images.fileName !== imageName
        );
      });
      body.images = updatedImagesArray;
    } else {
      body.images = [];
    }

    if (req.files) {
      req.files.forEach((image) => {
        body.images = [
          ...body.images,
          {
            fileName: image.filename,
            alt: altDescImages[body.images.length],
            id: image.id,
          },
        ];
      });
    }

    if (imagesToDelete.length >= 1) {
      const conn = mongoose.createConnection(mongo.uri, {});

      let gridFSBucket;
      conn.once("open", () => {
        gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
          bucketName: "images",
        });
        imagesToDelete.forEach((image) => {
          gridFSBucket.delete(new mongoose.Types.ObjectId(image.id));
        });
      });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      body,
      { new: true }
    );
    return res.json(project.transformProject());
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};

/**
 * DELETE project
 */
exports.remove = async (req, res, next) => {
  try {
    const projectImg = await Project.findById(req.params.projectId);
    const conn = mongoose.createConnection(mongo.uri, {});

    let gridFSBucket;
    conn.once("open", () => {
      gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "images",
      });
      projectImg.images.forEach((image) => {
        gridFSBucket.delete(new mongoose.Types.ObjectId(image.id));
      });
    });
    const project = await Project.findByIdAndDelete(req.params.projectId);
    return res.json(project);
  } catch (error) {
    next(Boom.badImplementation(error.message));
  }
};
