// Error Handler
const ErrorHandler = require("../utils/ErrorHandler");

// Handle MongoDB Duplicate Field Error
const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/{(.*?)}/)[1];

  const message = `This${value}is Already been Used`;

  return new ErrorHandler(message, 400);
};

// Handle MongoDB Cast Error
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new ErrorHandler(message, 400);
};

// Handle MongoDB Validation Error
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;

  return new ErrorHandler(message, 400);
};

// Wrong JWT Error
const handleJsonWebToken = (err) => {
  const message = "JSON Web Token is Invalid, try again";

  return new ErrorHandler(message, 400);
};

// JWT Expire Error
const handleTokenExpire = (err) => {
  const message = "JSON Web Token is Expired, try again";

  return new ErrorHandler(message, 400);
};

// Send Development Error
const SendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// Send Production Error
const SendProdError = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error
  } else {
    console.log("Error 💥:", err);

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Internal Server Error";

  if (process.env.NODE_ENV === "development") {
    SendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // MongoDB Error's
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);

    // JWT Error's
    if (err.name === "JsonWebTokenError") err = handleJsonWebToken(err);
    if (err.name === "TokenExpiredError") err = handleTokenExpire(err);

    SendProdError(err, res);
  }
};
