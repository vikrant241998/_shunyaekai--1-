const router = require("express").Router();

const Controller = require("../controller/employeeController");
const isAuthenticated = require("../utils/Auth");

// image upload using multer
const upload = require("../utils/multer");

// router
router.get("/old", isAuthenticated, Controller.OldData);

router.post(
  "/add",
  isAuthenticated,
  upload.single("emp_avatar"),
  Controller.AddData
);

router
  .route("/get/:id")
  .post(Controller.GetData)
  .put(isAuthenticated, Controller.GetOneforAdmin);

router
  .route("/:id?")
  .get(isAuthenticated, Controller.AllEmployee)
  .post(
    isAuthenticated,
    upload.single("emp_avatar"),
    Controller.UpdateEmployeeData
  );

module.exports = router;
