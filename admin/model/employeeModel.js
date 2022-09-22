const mongoose = require("mongoose");
const validator = require("validator");

const Schema = new mongoose.Schema({
  emp_id: {
    type: String,
    trim: true,
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
  },

  monitor: {
    type: String,
    trim: true,
    uppercase: true,
  },

  keyboard: {
    type: String,
    trim: true,
    uppercase: true,
  },

  mouse: {
    type: String,
    trim: true,
    uppercase: true,
  },

  system_unit: {
    type: String,
    trim: true,
    uppercase: true,
  },

  motherboard: {
    type: String,
    trim: true,
    uppercase: true,
  },

  RAM: {
    type: String,
    trim: true,
    uppercase: true,
  },

  processor: {
    type: String,
    trim: true,
    uppercase: true,
  },

  storage: {
    type: String,
    trim: true,
    uppercase: true,
  },

  graphic_card: {
    type: String,
    trim: true,
    uppercase: true,
  },

  gadgets: {
    type: String,
    trim: true,
    uppercase: true,
  },
});

module.exports = mongoose.model("employee", Schema);
