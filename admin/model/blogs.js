const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const blogSchema = new mongoose.Schema({
  blog_title: { type: String },
  blog_description: { type: String },
  blog_image: { type: String },
  blog_count: { type: Number },
  blog_categories: {
    type: String,
    enum: ["AI", "ROBOTICS", "IOT", "ML", "3D-DESIGN", ""],
  },
  page: {
    type: String,
    enum: ["Shunya Ekai", "RIOT Learning"],
  },
});

module.exports = mongoose.model("blogs", blogSchema);
