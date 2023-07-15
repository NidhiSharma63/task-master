const express = require("express");
const router = express.Router();
const {
  getAllUserTodo,
  registerUser,
  loginUser,
  getFormPage,
} = require("../controllers/routes");

// defining get route
router.route("/").get(getAllUserTodo);
router.route("/login").get(getFormPage);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
