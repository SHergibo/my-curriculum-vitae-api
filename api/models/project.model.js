const Mongoose = require("mongoose");

let Schema = Mongoose.Schema;

let uploadedImages = new Schema(
  {
    fileName: {
      type: String,
      trim: true,
      required: true,
    },
    alt: {
      type: String,
      trim: true,
      required: true,
    },
    id: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    _id: false,
  }
);

let schema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [uploadedImages],
      required: true,
    },
    technoUsedFront: {
      type: Array,
    },
    technoUsedBack: {
      type: Array,
    },
    urlWeb: {
      type: String,
      trim: true,
    },
    urlGithub: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

schema.methods.transformProject = function () {
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
  const object = {};
  fields.forEach((field) => {
    object[field] = this[field];
  });
  return object;
};

module.exports = Mongoose.model("Project", schema);
