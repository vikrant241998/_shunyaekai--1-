const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  university_name: {
    type: String,
  },
  college_name: {
    type: String,
  },
  state_name: {
    type: String,
  },
  district_name: {
    type: String,
  },
});
const college = mongoose.model("colleges", collegeSchema);

const universitySchema = new mongoose.Schema({
  university_name: {
    type: String,
  },
});
const university = mongoose.model("university", universitySchema);

module.exports = { college, university };
