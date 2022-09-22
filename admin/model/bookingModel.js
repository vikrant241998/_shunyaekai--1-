const mongoose = require("mongoose");

const validator = require("validator");

const Schema = new mongoose.Schema({
  course_name: {
    type: String,
    trim: true,
  },

  name: {
    type: String,
    trim: true,
  },

  email: {
    type: String,
    trim: true,
    validate: [validator.isEmail, "Please Enter Valid Email"],
  },

  mobile: {
    type: String,
    trim: true,
  },

  confirm_status: {
    type: String,
    default: "0",
    enum: ["0", "1"],
  },

  enroll_time: {
    type: String,
  },

  level: {
    type: String,
    trim: true,
    enum: ["Fundamental", "Intermediate", "Advance"],
  },
  
  mode_of_training:{
    type:String,
    trim:true    
    },

  college_name: {
    type: String,
    trim: true,
  },

  OTP: String,
  OTP_Expire: Date,
});

Schema.methods.Gen_OTP = function () {
  this.OTP = Math.trunc(Math.random() * (999999 - 100000) + 100000);
  this.OTP_Expire = Date.now() + 10 * 60 * 1000;

  return this.OTP;
};

module.exports = mongoose.model("booking", Schema);
