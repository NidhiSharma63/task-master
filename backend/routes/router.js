const express = require("express");
const router = express.Router();
const {
  getAllUserTodo,
  registerUser,
  loginUser,
} = require("../controllers/routes");

// defining get route
router.route("/").get(getAllUserTodo);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
