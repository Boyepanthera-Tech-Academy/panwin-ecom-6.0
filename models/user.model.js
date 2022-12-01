const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    username: String,
    email: String,
    phone: String,
    password: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
