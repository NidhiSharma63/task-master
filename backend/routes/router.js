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
  getAllTaskFromAllProjectAccordingToStatus,
  updateTaskWithStatus,
  updateTaskWithDetail,
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

const testing = (_req, res) => {
  res.json({ msg: "Working fine" });
};
router.route("/abc").post(testing);
router.route("/task").post(checkAuthorization, createTaskApi);
router.route("/task").get(checkAuthorization, getAllTaskAccordingToStatusApi);
router.route("/task").put(checkAuthorization, updateTaskApi);
router.route("/task/status").put(checkAuthorization, updateTaskWithStatus);
router.route("/task/details").put(checkAuthorization, updateTaskWithDetail);
router.route("/task").delete(checkAuthorization, deleteTaskApi);

/**
 * Task routes for charts
 */
router
  .route("/charts/tasks")
  .get(checkAuthorization, getAllTaskFromAllProjectAccordingToStatus);

module.exports = router;
