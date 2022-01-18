const Mongoose = require('mongoose');

let Schema = Mongoose.Schema;

let schema = new Schema({
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  img: {
    type: Object,
    required: true,
    trim: true
  },
  altImg: {
    type: String,
    required: true,
    trim: true
  },
  technoUsedFront: {
    type: Object,
    required: true,
  },
  technoUsedBack: {
    type: Object,
    required: true,
  },
  urlWeb: {
    type: String,
    trim: true
  },
  urlGithub: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

schema.methods.transformProject = function () {
  const fields = ['_id', 'projectName', 'description', 'img', "altImg", 'technoUsedFront', 'technoUsedBack', 'urlWeb', 'urlGithub'];
  const object = {};
  fields.forEach((field) => {
    object[field] = this[field];
  });
  return object;
};

module.exports = Mongoose.model('Project', schema);