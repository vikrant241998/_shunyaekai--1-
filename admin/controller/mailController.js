const Mailer = require("../utils/Mailer");

// Model
const bookingModel = require("../model/bookingModel");

// Promise Error
const AsyncError = require("../middleware/AsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

exports.forJob = AsyncError(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorHandler("Please upload valid file", 400));
  }

  const MailResponse = await new Mailer(req.body, "", "ShunyaEkai").sendForJob(
    `Apply for ${req.body.profile_name}`,
    req.body.email,
    req.file
  );

  if (MailResponse.accepted.length === 0) {
    return next(
      new ErrorHandler("Internal Server Error! Try Some Time Later", 400)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Successfully Mail Sent",
    
  });
});

exports.OTP_Gen = AsyncError(async (req, res, next) => {
  const { name, email, mobile, enroll_time, course_name, college_name, level, mode_of_training } =
    req.body;

  if (!name || !email || !mobile || !enroll_time || !course_name || !level) {
    return next(new ErrorHandler("Please Enter Valid Data", 400));
  }

  const bookingData = new bookingModel({
    name,
    email,
    mobile,
    enroll_time,
    course_name,
    college_name,
    level,
    mode_of_training
  });

  const OTP = await bookingData.Gen_OTP();

  await bookingData.save();

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

  res.status(200).json({
    status: "success",
    message: "Successfully Mail Sent",
    ID: bookingData._id,
  });
});

exports.OTP_Resend = AsyncError(async (req, res, next) => {
  const Data = await bookingModel.findById(req.body.id);

  if (!Data) {
    return next(new ErrorHandler("No Data Found!", 404));
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

exports.CompleteEnroll = AsyncError(async (req, res, next) => {
  const Data = await bookingModel.findById(req.body.id, {
    confirm_status: 0,
    __v: 0,
  });

  if (!Data) {
    await bookingModel.deleteOne({ email: Data.email });

    return next(
      new ErrorHandler("Enroll OTP is Invalid or has been Expire", 403)
    );
  }

  if (req.body.otp !== Data.OTP) {
    return next(new ErrorHandler("OTP does not Match", 403));
  }

  Data.OTP = undefined;
  Data.OTP_Expire = undefined;
  Data.confirm_status = "1";

  await Data.save();

  await new Mailer(req.body, "RIOT").Enroll(
    "Counselling Session is booked",
    Data
  );

  const MailResponse = await new Mailer(req.body, "", "RIOT").toSendAdmin(
    "Counselling Session Booked",
    Data.name,
    { ...Data._doc, _id: undefined }
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
