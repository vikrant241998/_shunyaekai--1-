const mongoose = require("mongoose");
const validator = require("validator");

const Schema = new mongoose.Schema({
  course_title: {
    type: String,
    trim: true,
  },

  course_description: {
    type: String,
    trim: true,
  },

  course_img: {
    type: String,
  },

  course_price: {
    type: String,
  },

  course_duration: {
    type: String,
    trim: true,
    enum: ["45", "60", "90"],
  },

  course_status: {
    type: String,
    trim: true,
    enum: ["0", "1"],
  },

  course_level: {
    type: String,
    trim: true,
    enum: ["Fundamental", "Intermediate", "Advance"],
  },
});

module.exports = mongoose.model("courses", Schema);
