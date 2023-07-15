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
      throw new Error("Missing email or password");
    }

    // check if user have enterd the correct password or not
    if (password !== confirmPassword) {
      throw new Error("Password and confirm password does not match");
    }

    // generate hash password with round 10
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email: email,
      password: hashPassword,
    });

    // before saving the user create the toke
    await user.generateAuthToken();

    // create user
    await user.save();
    res.status(200).json({ msg: "user created" });
  } catch (error) {
    if (error.code === 11000 && error.keyValue && error.keyValue.email) {
      // Duplicate email error
      res.status(400).json({ error: "Email is already registered" });
    } else {
      res.status(401).json({ error: error.message });
    }
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

    // verify password first pass user created password and then pass stored password
    const verifyPassword = await bcrypt.compare(password, getPassword);

    if (!verifyPassword) {
      throw new Error("Invalid login detail");
    }

    // generate token once user have correct credentials
    isUserAvailable.generateAuthToken();

    // is all okay send user back data
    if (isUserAvailable) {
      res.status(201).json({ msg: "user logged in" });
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
