const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

const getAllUserTodo = (_req, res) => {
  res.send("Your All Todo Is Here");
};

const registerUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // check if any field is missing or not
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      res.status(401).json({ error: "Missing email or password" });
    }

    // check if user have enterd the correct password or not
    if (password !== confirmPassword) {
      res
        .status(401)
        .json({ error: "Password and confirm password does not match" });
    }
    const user = new User({
      email: email,
      password: password,
    });

    // create user
    await user.save();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: "Email is already Present" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user already register or not because only register user can log in
    const isUserAvailable = await User.findOne({ email });
    if (!isUserAvailable) {
      throw new Error("Invalid login detail");
    }

    // check if provided password by user is same as stored in data
    const getPassword = isUserAvailable.password;
    if (password !== getPassword) {
      throw new Error("Invalid login detail");
    }

    // is all okay send user back data
    if (isUserAvailable) {
      res.status(200).json({ msg: "user logged in" });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  getAllUserTodo,
  registerUser,
  loginUser,
};
