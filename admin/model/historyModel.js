const mongoose = require("mongoose");
const validator = require("validator");

const Schema = new mongoose.Schema(
  {
    old_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      required: [true, "Please Enter Old Employee Primary Key"],
    },

    emp_id: {
      type: String,
      trim: true,
      required: true,
    },

    emp_name: {
      type: String,
      trim: true,
      uppercase: true,
      required: true,
    },

    emp_email: {
      type: String,
      trim: true,
      validate: [validator.isEmail, "Please Enter Valid Mail"],
      required: true,
    },

    emp_mobile: {
      type: String,
      trim: true,
      validate: [validator.isMobilePhone, "Please Enter Valid Mobile Number"],
      required: true,
    },

    emp_designation: {
      type: String,
      trim: true,
      uppercase: true,
      required: true,
    },

    emp_avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("employee_history", Schema);
