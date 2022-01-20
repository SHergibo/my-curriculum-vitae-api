const Mongoose = require('mongoose'),
      DomPurify = require('isomorphic-dompurify');

let Schema = Mongoose.Schema;

const SkillCategory = ['generalSkill', 'codingSkill', 'language'];

let schema = new Schema({
  nameSkill: {
    type: String,
    required: true,
    trim: true
  },
  percentage: {
    type: Number,
    required: true,
    trim: true
  },
  skillCategory: {
    type: String,
    enum: SkillCategory,
    required: true
  },
  fontAwesomeIcon: {
    type: String,
  },
  svgIcon: {
    type: String,
    set: function (val) {
      return DomPurify.sanitize(val);
    }
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

schema.methods.transformSkill = function () {
  const fields = ['_id', 'nameSkill', 'percentage', 'skillCategory', 'fontAwesomeIcon', 'svgIcon'];
  const object = {};
  fields.forEach((field) => {
    object[field] = this[field];
  });
  return object;
};

module.exports = Mongoose.model('Skill', schema);