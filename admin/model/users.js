const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: { type: String, select: false },

  role: {
    type: String,
    trim: true,
    enum: ["Admin", "ShunyaEkai", "RIOT"],
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 14
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.comparePassword = async function (
  enteredPass,
  userpassword
) {
  return await bcrypt.compare(enteredPass, userpassword);
};

module.exports = mongoose.model("users", userSchema);
