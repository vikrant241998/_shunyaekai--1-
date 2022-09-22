const formModel = require("../model/FormModel");

const Mailer = require("../utils/Mailer");

// Error Handler
const AsyncError = require("../middleware/AsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

exports.addFormData = AsyncError(async (req, res, next) => {
  const {
    name,
    mobile,
    email,
    course_name,
    form_type,
    offer,
    level,
    college_name,
    description,
    mode_of_training,
  } = req.body;

  if (!name || !mobile || !email || !course_name || !form_type || !level ||!mode_of_training) {
    return next(new ErrorHandler("Please Enter Valid Data", 400));
  }

  const newFormData = new formModel({
    name,
    mobile,
    email,
    course_name,
    form_type,
    offer,
    level,
    college_name,
    description,
    mode_of_training,
  });

  const OTP = await newFormData.Gen_OTP();

  await newFormData.save();

  const MailResponse = await new Mailer(req.body, "RIOT").OTPGen(
    "RIOT Confirmation Mail",
    OTP,
    email
  );

  if (MailResponse.accepted.length === 0) {
    return next(
      new ErrorHandler("Internal Server Error! Try Some Time Later", 400)
    );
  }

  res.status(201).json({
    status: "success",
    message: "Successfully Mail Sent",
    ID: newFormData._id,
  });
});

exports.authenticateFormData = AsyncError(async (req, res, next) => {
  const Data = await formModel.findById(req.body.id, {
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  });

  if (!Data) {
    await formModel.deleteOne({ email: Data.email });

    return next(
      new ErrorHandler("Enroll OTP is Invalid or has been Expire", 403)
    );
  }

  if (req.body.otp !== Data.OTP) {
    return next(new ErrorHandler("OTP does not Match", 401));
  }

  Data.OTP = undefined;
  Data.OTP_Expire = undefined;

  await Data.save();

  await new Mailer(req.body, "RIOT").Thankyou(
    "Thanks for Choosing US",
    Data.name,
    Data.email
  );

  const MailResponse = await new Mailer(req.body, "", "RIOT").toSendAdmin(
    `${Data.form_type}`,
    Data.email,
    {
      ...Data._doc,
      _id: undefined,
      updatedAt: undefined,
      form_type: undefined,
    }
  );

  if (MailResponse.accepted.length === 0) {
    return next(
      new ErrorHandler("Internal Server Error! Try Some Time Later", 400)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Enrolled Successfully",
  });
});

// resent otp
exports.resendOTP = AsyncError(async (req, res, next) => {
  const Data = await formModel.findById(req.body.id);

  if (!Data) {
    return next(new ErrorHandler("No Data Found", 404));
  }

  const OTP = await Data.Gen_OTP();

  await Data.save();

  const MailResponse = await new Mailer(req.body, "RIOT").OTPGen(
    "RIOT Confirmation Mail",
    OTP,
    Data.email
  );

  if (MailResponse.accepted.length === 0) {
    return next(
      new ErrorHandler("Internal Server Error! Try Some Time Later", 400)
    );
  }

  res.status(200).json({
    status: "success",
    message: "OTP Resend Successfully",
  });
});
