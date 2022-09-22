const careers = require("../model/careers");
const AsyncError = require("../middleware/AsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

// create new career profile
exports.addCareer = AsyncError(async (req, res, next) => {
  const {
    profile_name,
    profile_description,
    qualification,
    experience,
    industry_type,
    employment_type,
    key_skill,
    location,
    working_days,
    responsibility,
    no_of_job,
    status,
  } = req.body;

  if (
    !profile_name ||
    !profile_description ||
    !qualification ||
    !experience ||
    !industry_type ||
    !employment_type ||
    !key_skill ||
    !location ||
    !working_days ||
    !responsibility ||
    !no_of_job ||
    !status
  ) {
    return next(
      new ErrorHandler("Please Enter Data, All field's are mandatory", 400)
    );
  }

  const data = await careers.create({
    profile_name,
    profile_description,
    qualification,
    experience,
    industry_type,
    employment_type,
    key_skill,
    location,
    working_days,
    responsibility,
    no_of_job,
    status,
  });

  res.status(201).json({ status: "success", message: "New Data Insert", data });
});

// Get Single career profile
exports.getCareer = AsyncError(async (req, res, next) => {
  const data = await careers.findById(req.params.id);

  if (!data) {
    return next(new ErrorHandler("Data not found", 400));
  }

  res.status(200).json({ meassage: "Data get succeessfully.", data });
});

// Get All Career
exports.getAllCareer = AsyncError(async (req, res, next) => {
  const data = await careers.find();

  res.status(200).json({
    status: "success",
    meassage: "Data get succeessfully.",
    data: data,
  });
});

// Update Career Data
exports.editCareer = AsyncError(async (req, res, next) => {
  const Data = await careers.findById(req.params.id);

  if (!Data) {
    return next(new ErrorHandler("No Data Found!", 404));
  }

  await careers.updateOne({ _id: Data._id }, req.body, {
    runValidators: true,
    new: true,
  });

  res
    .status(200)
    .json({ status: "success", message: "career update successfully." });
});

// Delete Career Data
exports.deleteCareer = AsyncError(async (req, res, next) => {
  await careers.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ status: "success", message: "career profile delete successfully" });
});
