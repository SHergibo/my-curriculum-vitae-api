const Mongoose = require("mongoose"),
  DomPurify = require("isomorphic-dompurify");

let Schema = Mongoose.Schema;

const SkillCategory = ["generalSkill", "codingSkill", "language"];

let fontAwesomeIconSchema = new Schema(
  {
    label: {
      type: String,
      trim: true,
      required: true,
    },
    value: {
      type: String,
      trim: true,
      required: true,
    },
    prefix: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    _id: false,
  }
);

let schema = new Schema({
  nameSkill: {
    type: String,
    required: true,
    trim: true,
  },
  skillCategory: {
    type: String,
    enum: SkillCategory,
    required: true,
  },
  fontAwesomeIcon: {
    type: fontAwesomeIconSchema,
  },
  svgIcon: {
    type: String,
    set: function (val) {
      return DomPurify.sanitize(val);
    },
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

schema.methods.transformSkill = function () {
  const fields = [
    "_id",
    "nameSkill",
    "skillCategory",
    "fontAwesomeIcon",
    "svgIcon",
  ];
  const object = {};
  fields.forEach((field) => {
    object[field] = this[field];
  });
  return object;
};

module.exports = Mongoose.model("Skill", schema);
