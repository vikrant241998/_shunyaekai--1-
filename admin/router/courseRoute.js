const express = require("express");
const router = express.Router();

const Controller = require("../controller/CourseController");
const isAuthenticated = require("../utils/Auth");
const upload = require("../utils/multer");

router
  .route("/")
  .post(isAuthenticated, upload.single("course_image"), Controller.AddCourse)
  .get(Controller.AllCourse);

router
  .route("/one/:id")
  .get(isAuthenticated, Controller.GetOne)
  .post(isAuthenticated, upload.single("course_image"), Controller.UpdateOne);

router.get("/search/:title", Controller.SearchOne);

module.exports = router;
