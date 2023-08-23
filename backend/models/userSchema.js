const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();
const uniqueValidator = require("mongoose-unique-validator");

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
  token: {
    type: String,
  },
  timeZone: {
    type: String,
  },
});

// create a token
userSchema.methods.generateAuthToken = async function () {
  try {
    const genToken = jwt.sign(
      { id: this._id.toString() },
      process.env.SECREAT_KEY
    );
    this.token = genToken;
    await this.save();
    return genToken;
  } catch (error) {
    throw new Error(error);
  }
};

// Apply the uniqueValidator plugin to the userSchema
userSchema.plugin(uniqueValidator, {
  message: "{PATH} already exists.", // {PATH} will be replaced with the field name, i.e., "Email"
});

// now we need to create collection

const User = new mongoose.model("User", userSchema);

module.exports = User;
