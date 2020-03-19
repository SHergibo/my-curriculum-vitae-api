const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const { mongo } = require('./../../config/environment.config');

let storage = new GridFsStorage({
  url: mongo.uri,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "images",
      filename: `${Date.now()}-${file.originalname}`
    };
  }
});

let uploadImg = multer({ storage: storage }).single("img");
let uploadImgMiddleware = util.promisify(uploadImg);
module.exports = uploadImgMiddleware;