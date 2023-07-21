const express = require("express");
const router = express.Router();
const {
  getAllUserTodo,
  registerUser,
  loginUser,
  logout,
} = require("../controllers/routes");
const checkAuthorization = require("../middleware/auth");

// defining get route
router.route("/alltodos").get(checkAuthorization, getAllUserTodo);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);

module.exports = router;
