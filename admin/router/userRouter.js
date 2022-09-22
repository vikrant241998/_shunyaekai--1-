const router = require("express").Router();
const AsyncError = require("../middleware/AsyncError");
const jwt = require("jsonwebtoken");
const users = require("../model/users");
const mongoose = require("mongoose");
const ErrorHandler = require("../utils/ErrorHandler");
const bcryptjs = require("bcryptjs");

// Admin Login

// router.post(
//   "/add-user",
//   AsyncError(async (req, res, next) => {
//     const { email, password, role } = req.body;

//     const User = await users.create({ email, password, role });

//     res.status(201).json({
//       User,
//     });
//   })
// );

router.post(
  "/login",
  AsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    const userData = await users.findOne({ email }).select("+password");
    if (!userData) {
      return next(new ErrorHandler("Plase enter valid data", 401));
    }
    const pass = await userData.comparePassword(password, userData.password);
    if (!pass) {
      return next(new ErrorHandler("Plase enter valid data", 401));
    }

    userData.password = undefined;

    const accessToken = jwt.sign({ id: userData._id }, process.env.SECRET_KEY, {
      expiresIn: "90d",
    });

    res
      .status(200)
      .cookie("token", accessToken, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        signed: true,
        secure: true,
      })
      .json({ message: "Login successfully.", Data: userData });
  })
);

// Logout User
router.get(
  "/logout",

  AsyncError(async (req, res, next) => {
    req.user = undefined;
    
    res.cookie("token", "get-lost", {
        expires: new Date(Date.now()),
        httpOnly: true,
        signed: true,
        secure: true,
      })

    res
      .status(200)
      .json({
        status: "success",
        message: "User Successfully Logout",
      });
  })
);

module.exports = router;
