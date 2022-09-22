// User Model to Confirm User who is logged in
const userModel = require("../model/users");

// Json WEb Token
const jwt = require("jsonwebtoken");

// Promisify from Util to use make Async Algo
const { promisify } = require("util");

// Promise Error Handler
const AsyncError = require("../middleware/AsyncError");

// Error Handler
const ErrorHandler = require("./ErrorHandler");

// Authenticated Route or Private Route (Only use Logged In User)
const isAuthenticated = AsyncError(async (req, res, next) => {
  const { token } = req.signedCookies;

  // const { token } = req.headers;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resources", 401));
  }

  const decodeData = await promisify(jwt.verify)(token, process.env.SECRET_KEY);

  const User = await userModel.findById(decodeData.id);

  if (!User) {
    return next(
      new ErrorHandler(
        "The user belonging to this token is no longer exist.",
        401
      )
    );
  }

  req.user = User;

  next();
});

module.exports = isAuthenticated;
