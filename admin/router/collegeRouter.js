const router = require("express").Router();
const { college, university } = require("../model/colleges");
const ErrorHandler = require("../utils/ErrorHandler");
const AsyncError = require("../middleware/AsyncError");

router.get(
  "/university_list",
  AsyncError(async (req, res, next) => {
    const list = await university.find();
    if (list.length === 0) {
      return next(new ErrorHandler("Empty list", 400));
    }
    res.status(200).json({
      message: "country list",
      status: "success",
      university: list,
    });
  })
);
router.get(
  "/college-list/:name",
  AsyncError(async (req, res, next) => {
    const list = await college.find({ university_name: req.params.name });
    if (list.length === 0) {
      return next(new ErrorHandler("Empty list", 400));
    }
    res.status(200).json({
      message: "country list",
      status: "success",
      university: list,
    });
  })
);

module.exports = router;
