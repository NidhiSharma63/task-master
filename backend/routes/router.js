const express = require("express");
const router = express.Router();
const { getAllUserTodo, registerUser } = require("../controllers/routes");

// defining get route
router.route("/").get(getAllUserTodo);
router.route("/register").post(registerUser);

module.exports = router;
