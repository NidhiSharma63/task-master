const jwt = require("jsonwebtoken");
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// create a token
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign({ id: this._id });
  } catch (error) {}
};

// now we need to create collection

const User = new mongoose.model("User", userSchema);

module.exports = User;
