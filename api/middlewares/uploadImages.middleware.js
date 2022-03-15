const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { mongo } = require("./../../config/environment.config");

let storage = new GridFsStorage({
  url: mongo.uri,
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "images",
      filename: `${Date.now()}-${file.originalname}`,
    };
  },
});

let uploadImg = multer({ storage: storage }).array("images", 4);
let uploadImgsMiddleware = util.promisify(uploadImg);
module.exports = uploadImgsMiddleware;
