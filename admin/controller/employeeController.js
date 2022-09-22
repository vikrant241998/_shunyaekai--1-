const empModel = require("../model/employeeModel");
const sharp = require("sharp");
const fs = require("fs");

// Promise Error Handler
const AsyncError = require("../middleware/AsyncError");

// Error Handler
const ErrorHandler = require("../utils/ErrorHandler");
const historyModel = require("../model/historyModel");

exports.AddData = AsyncError(async (req, res, next) => {
    
    
    
  if (req.file) {
      let ext = `${req.file.mimetype}`.split("/")[1];
      req.body.emp_avatar = `avatar_${Date.now()}.${ext}`;

      await sharp(req.file.path).resize(484, 460).toFile(`public/avatar/${req.body.emp_avatar}`);

      sharp.cache(false);

      fs.unlinkSync(req.file.path);
    
  }

  

  const Data = await empModel.create({
    ...req.body,
  });

  if (!Data) {
    return next(new ErrorHandler("Please Enter Valid Data", 400));
  }

  res.status(201).json({
    status: "success",
    message: "Data Successfully Submit",
    data: Data,
  });
});

exports.GetData = AsyncError(async (req, res, next) => {
  const Data = await empModel.findById(req.params.id);
  const OldData = await historyModel
    .find({ old_id: req.params.id })
    .sort({ createdAt: -1 });

  if (!Data) {
    return next(
      new ErrorHandler(
        "The information is belonging to this QR Code is no longer exist!",
        400
      )
    );
  }

  res.status(200).json({
    status: "success",
    result: "Data Successfuly Fetched",
    data: Data,
    old_emp: OldData,
  });
});

exports.AllEmployee = AsyncError(async (req, res, next) => {
  const Data = await empModel.find(
    {},
    { emp_name: 1, emp_id: 1, emp_email: 1, emp_designation: 1, emp_mobile: 1 }
  );

  res.status(200).json({
    status: "success",
    message: "Data Successfully Fetched",
    data: Data,
  });
});

exports.GetOneforAdmin = AsyncError(async (req, res, next) => {
  const Data = await empModel.findById(req.params.id);

  if (!Data) {
    return next(
      new ErrorHandler(
        "The information is belonging to this ID Code is no longer exist!",
        400
      )
    );
  }

  res.status(200).json({
    status: "success",
    message: "Data Successfully Fetched",
    data: Data,
  });
});

exports.UpdateEmployeeData = AsyncError(async (req, res, next) => {
  const EmployeeData = await empModel.findById(req.params.id);

  const Obj = {
    Auth: true,
  };

  if (
    req.body.emp_id !== EmployeeData.emp_id &&
    req.body.emp_email !== EmployeeData.emp_email &&
    req.body.emp_mobile !== EmployeeData.emp_mobile
  ) {
    await historyModel.create({
      old_id: EmployeeData._id,
      emp_id: EmployeeData.emp_id,
      emp_name: EmployeeData.emp_name,
      emp_email: EmployeeData.emp_email,
      emp_mobile: EmployeeData.emp_mobile,
      emp_avatar: EmployeeData.emp_avatar,
      emp_designation: EmployeeData.emp_designation,
    });
    Obj.Auth = false;
  }

  if (req.file) {
    let ext = `${req.file.mimetype}`.split("/")[1];
    Obj.name = `avatar_${Date.now()}.${ext}`;

    await sharp(req.file.path)
      .resize(484, 460)
      .toFile(`public/avatar/${Obj.name}`);

    sharp.cache(false);

    if (Obj.Auth) {
      fs.unlink(`public/${EmployeeData.emp_avatar}`, (err) => {
        if (err) throw err;
        console.log("deleted!");
      });
    }

    fs.unlinkSync(req.file.path);
  }

  const Data = await empModel.updateOne(
    { _id: req.params.id },
    {
      ...req.body,
      emp_avatar: `avatar/${
        Obj.name || `${EmployeeData.emp_avatar}`.split("/")[1]
      }`,
    },
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Data Successfully Update",
    data: Data,
  });
});

exports.OldData = AsyncError(async (req, res, next) => {
  const Data = await historyModel.find();

  if (Data.length === 0) {
    return next(new ErrorHandler("No Data Found!", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Data Successfully Fetched",
    data: Data,
  });
});
