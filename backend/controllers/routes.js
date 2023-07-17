const cookieParser = require("cookie-parser");

const express = require("express");
const server = express();
server.use(cookieParser());
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

// protected route
const getAllUserTodo = (_req, res) => {
  res.send("Your All Todo Is Here");
};

// login page
const getFormPage = (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Login Form</title>
      </head>
      <body>
        <h1>Login Form</h1>
        <form action="/api/v1/login" method="POST">
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
          </div>
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
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
    const token = await user.generateAuthToken();

    // setting token as a cookie
    res.cookie("Todo", token, { httpOnly: true, secure: true });

    // create user
    await user.save();
    res.status(200).json({ user, token });
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
    const token = await isUserAvailable.generateAuthToken();

    // setting token as a cookie
    res.cookie("Todo", token, { httpOnly: true, secure: true });

    // is all okay send user back data
    if (isUserAvailable) {
      // res.status(201).json({ msg: "user logged in" });
      res.redirect("/api/v1");
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// logout page
const logout = async (req, res) => {
  try {
    res.clearCookie("Todo");
    const user = req.user;

    // updating token
    user.token = {};

    // saving user to database after updatig the token
    await user.save();
    res.redirect("/api/v1/login");
  } catch (error) {
    console.log("Error occrued");
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUserTodo,
  registerUser,
  loginUser,
  getFormPage,
  logout,
};
