// Exporting all routes here

const { registerUser, loginUser, logout } = require("./auth/authRoutes");

const {
  createProjectApi,
  createTaskApi,
  createColumnsApi,
} = require("./api/apiPostRoutes");
const {
  getProjectApi,
  getAllTaskAccordingToStatusApi,
  getAllTaskFromAllProjectAccordingToStatus,
} = require("./api/apiGetRoutes");
const { deleteProjectApi, deleteTaskApi } = require("./api/apiDeleteRoutes");
const {
  updateTaskApi,
  updateTaskWithStatus,
  updateTaskWithDetail,
  updateProjectApi,
} = require("./api/apiUpdateRoutes");

module.exports = {
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
  updateProjectApi,
  createColumnsApi,
};
