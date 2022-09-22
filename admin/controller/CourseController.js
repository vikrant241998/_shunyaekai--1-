const courseModel = require("../model/courseModel");

// Async Error Handler
const AsyncError = require("../middleware/AsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const sharp = require("sharp");
const fs = require("fs");

// 756 * 388

exports.AddCourse = AsyncError(async (req, res, next) => {
  const {
    course_title,
    course_description,
    course_price,
    course_level,
    course_duration,
    course_status,
  } = req.body;

  if (
    !course_title ||
    !course_description ||
    !course_duration ||
    !course_level ||
    !course_price ||
    !course_status
  ) {
    return next(new ErrorHandler("Please Enter Valid Data", 400));
  }

  if (!req.file) {
    return next(new ErrorHandler("Please Upload Course Image", 400));
  }

  const ext = `${req.file.mimetype}`.split("/")[1];
  const fileName = `course_${Date.now() + req.user._id}.${ext}`;

  await sharp(req.file.path)
    .resize(680, 446)
    .toFile(`public/course_img/${fileName}`);

  sharp.cache(false);

  fs.unlinkSync(req.file.path);

  const CourseData = await courseModel.create({
    course_title,
    course_description,
    course_duration,
    course_level,
    course_price,
    course_status,
    course_img: `course_img/${fileName}`,
  });

  res.status(201).json({
    status: "success",
    message: "Course Data Successfully Uploaded",
    data: CourseData,
  });
});

exports.AllCourse = AsyncError(async (req, res, next) => {
  const Data = await courseModel.find();

  if (!Data) {
    return next(new ErrorHandler("No Data Found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Course Data Successfully fetched",
    data: Data,
  });
});

exports.GetOne = AsyncError(async (req, res, next) => {
  const Data = await courseModel.findById(req.params.id);

  if (!Data) {
    return next(new ErrorHandler("No Data Found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Successfully fetched",
    data: Data,
  });
});

exports.UpdateOne = AsyncError(async (req, res, next) => {
  const Data = await courseModel.findById(req.params.id);
  const Obj = {
    name: "",
  };

  if (!Data) {
    return next(new ErrorHandler("No Data Found", 404));
  }

  if (req.file) {
    const ext = `${req.file.mimetype}`.split("/")[1];
    Obj.name = `course_${Date.now() + req.user._id}.${ext}`;

    await sharp(req.file.path)
      .resize(680, 446)
      .toFile(`public/course_img/${Obj.name}`);

    sharp.cache(false);

    fs.unlinkSync(req.file.path);

    fs.unlink(`public/${Data.course_img}`, function (err) {
      if (err) throw err;
      console.log("delete!'");
    });
  }

  const UpdatedData = await courseModel.updateOne(
    { _id: Data._id },
    {
      ...req.body,
      course_img: `course_img/${
        Obj.name || `${Data.course_img}`.split("/")[1]
      }`,
    },
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Course Successfully Update",
    data: UpdatedData,
  });
});

exports.SearchOne = AsyncError(async (req, res, next) => {
  const Data = await courseModel.find({
    course_title: { $regex: req.params.title, $options: "i" },
  });

  if (!Data) {
    return next(new ErrorHandler("No Course Found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Course Fetched Successfully",
    data: Data,
  });
});
