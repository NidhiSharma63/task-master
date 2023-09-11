const express = require("express");
const router = express.Router();
const {
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
  updateProjectApi,
  updateTaskWithDetail,
  createColumnsApi,
  getColumns,
  deleteColumn,
  updateColumnName,
  createPages,
  getPagesApi,
  deletePagesApi,
  updatePagesApi,
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
router.route("/projects").put(checkAuthorization, updateProjectApi);

/**
 * Task Route
 */

router.route("/task").post(checkAuthorization, createTaskApi);
router.route("/task").get(checkAuthorization, getAllTaskAccordingToStatusApi);
router.route("/task").put(checkAuthorization, updateTaskApi);
router.route("/task/status").put(checkAuthorization, updateTaskWithStatus);
router.route("/task/details").put(checkAuthorization, updateTaskWithDetail);
router.route("/task").delete(checkAuthorization, deleteTaskApi);

/**
 * Task routes for charts
 */
router.route("/project/status/alltasks").get(checkAuthorization, getAllTaskFromAllProjectAccordingToStatus);

/**
 * Columns
 */
router.route("/column").post(checkAuthorization, createColumnsApi);
router.route("/column").get(checkAuthorization, getColumns);
router.route("/column").delete(checkAuthorization, deleteColumn);
router.route("/column").put(checkAuthorization, updateColumnName);

/**
 * Pages
 */
router.route("/page").post(checkAuthorization, createPages);
router.route("/page").get(checkAuthorization, getPagesApi);
router.route("/page").delete(checkAuthorization, deletePagesApi);
router.route("/page").put(checkAuthorization, updatePagesApi);

module.exports = router;
