const express = require("express");
const router = express.Router();

const multer = require("multer");

// For Upload Resume
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/CV/");
  },
  filename: function (req, file, cb) {
    const ext = `${file.mimetype}`.split("/")[1];
    cb(
      null,
      `${file.originalname}`.split(".")[0] + "-" + `${Date.now()}.${ext}`
    );
  },
});

const upload = multer({ storage: storage });

const Controller = require("../controller/mailController");

router.post("/job", upload.single("resume"), Controller.forJob);
router.post("/enroll", Controller.OTP_Gen);
router.post("/auth", Controller.CompleteEnroll);

router.post("/resend", Controller.OTP_Resend);

module.exports = router;
