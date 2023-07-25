const express = require("express");
const router = express.Router();
const {
  getAllUserTodo,
  registerUser,
  loginUser,
  logout,
  createProjectApi,
  getProjectApi,
  deleteProjectApi,
  createTaskApi,
  getAllTaskAccordingToStatusApi,
  updateTaskApi,
  deleteTaskApi,
} = require("../controllers/routes");
const checkAuthorization = require("../middleware/auth");

/**
 * Auth route
 */
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);

/**
 * Projects Routes
 */
router.route("/projects").post(checkAuthorization, createProjectApi);
router.route("/projects").get(checkAuthorization, getProjectApi);
router.route("/projects").delete(checkAuthorization, deleteProjectApi);

/**
 * Task Route
 */
router.route("/task").post(checkAuthorization, createTaskApi);
router.route("/task").get(checkAuthorization, getAllTaskAccordingToStatusApi);
router.route("/task").put(checkAuthorization, updateTaskApi);
router.route("/task").delete(checkAuthorization, deleteTaskApi);

module.exports = router;
