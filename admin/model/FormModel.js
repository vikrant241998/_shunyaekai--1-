const mongoose = require("mongoose");

const validator = require("validator");

const Schema = new mongoose.Schema(
  {
    form_type: {
      type: String,
      trim: true,
      enum: [
        "OFFER",
        "CONTACT",
        "INDUSTRIAL TRAINING",
        "FRESHER DATA",
        "PROFESSIONAL WORKING DATA",
      ],
      uppercase: true,
    },

    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      validate: [validator.isEmail, "Please Enter Valid Mail"],
      trim: true,
    },

    mobile: {
      type: String,
      trim: true,
    },

    course_name: {
      type: String,
      trim: true,
    },

    level: {
      type: String,
      trim: true,
      enum: ["Fundamental", "Intermediate", "Advance"],
    },

    offer: {
      type: String,
      trim: true,
    },

    college_name: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },
    mode_of_training:{
    type:String,
    trim:true
        
    },
    OTP: String,
    OTP_Expire: Date,
  },

  { timestamps: true }
);

Schema.methods.Gen_OTP = function () {
  this.OTP = Math.trunc(Math.random() * (999999 - 100000) + 100000);
  this.OTP_Expire = Date.now() + 10 * 60 * 1000;

  return this.OTP;
};

module.exports = mongoose.model("form", Schema);
