const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    profile_name: { type: String, trim: true },
    profile_description: { type: String, trim: true },
    qualification: { type: String, trim: true },
    experience: { type: String, trim: true },
    industry_type: { type: String, trim: true },
    employment_type: { type: String, trim: true },
    key_skill: { type: String, trim: true },
    location: { type: String, trim: true },
    working_days: { type: String, trim: true },
    responsibility: { type: String, trim: true },
    no_of_job: { type: String, trim: true },
    status: {
      type: String,
      trim: true,
      enum: ["0", "1"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("careers", careerSchema);
