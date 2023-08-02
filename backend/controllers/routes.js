// Exporting all routes here

const {
  getAllUserTodo,
  registerUser,
  loginUser,
  logout,
} = require("./auth/authRoutes");

const { createProjectApi, createTaskApi } = require("./api/apiPostRoutes");
const {
  getProjectApi,
  getAllTaskAccordingToStatusApi,
  getAllTaskFromAllProjectAccordingToStatus,
} = require("./api/apiGetRoutes");
const { deleteProjectApi, deleteTaskApi } = require("./api/apiDeleteRoutes");
const {
  updateTaskApi,
  updateTaskWithStatus,
} = require("./api/apiUpdateRoutes");

module.exports = {
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
};
