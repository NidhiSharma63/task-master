const mongoose = require("mongoose");

// creating schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});

// now we need to create collection

const User = new mongoose.model("User", userSchema);

module.exports = User;
