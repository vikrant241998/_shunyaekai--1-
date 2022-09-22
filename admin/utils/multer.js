const multer = require("multer");

var storage = multer.diskStorage({
  fileFilter: (req, file, cb) => {
    let ext = `${file.mimetype}`.split("/")[1];

    if (ext !== "jpg" && ext !== "jpeg" && ext !== "png") {
      cb(new Error("File type is not support"), false);
      return;
    }
    cb(null, true);
  },

  destination: (req, file, cb) => {
    cb(null, "./public");
  },
});

var upload = multer({
  storage: storage,
});

module.exports = upload;
