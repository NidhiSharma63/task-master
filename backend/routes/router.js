const express = require("express");
const router = express.Router();
const {
  getAllUserTodo,
  registerUser,
  loginUser,
  logout,
} = require("../controllers/routes");
const auth = require("../middleware/auth");

// defining get route
router.route("/").get(auth, getAllUserTodo);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);

module.exports = router;
