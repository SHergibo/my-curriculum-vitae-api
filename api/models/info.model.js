const Mongoose = require("mongoose"),
  DomPurify = require("isomorphic-dompurify");

let Schema = Mongoose.Schema;

let fontAwesomeIconSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
    prefix: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

let profTitleSchema = new Schema(
  {
    nameProfessionTitle: {
      type: String,
      required: true,
      trim: true,
    },
    fontAwesomeIcon: {
      type: fontAwesomeIconSchema,
    },
    svgIconProfTitle: {
      type: String,
      set: function (val) {
        return DomPurify.sanitize(val);
      },
    },
    id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    _id: false,
  }
);

let profilePicSchema = new Schema(
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

let schema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    zip: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
  },
  birthdate: {
    type: Date,
    required: true,
    trim: true,
  },
  licence: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  professionTitles: {
    type: [profTitleSchema],
  },
  profilePic: {
    type: profilePicSchema,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

schema.methods.transformInfo = function () {
  const fields = [
    "_id",
    "firstname",
    "lastname",
    "phone",
    "email",
    "address",
    "birthdate",
    "licence",
    "description",
    "professionTitles",
    "profilePic",
    "userId",
  ];
  const object = {};
  fields.forEach((field) => {
    object[field] = this[field];
  });
  return object;
};

module.exports = Mongoose.model("Info", schema);
