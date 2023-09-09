// Exporting all routes here

const { registerUser, loginUser, logout } = require("./auth/authRoutes");

const { createProjectApi, createTaskApi, createColumnsApi, createPages } = require("./api/apiPostRoutes");
const {
  getProjectApi,
  getAllTaskAccordingToStatusApi,
  getAllTaskFromAllProjectAccordingToStatus,
  getColumns,
  getPagesApi,
} = require("./api/apiGetRoutes");
const { deleteProjectApi, deleteTaskApi, deleteColumn, deletePagesApi } = require("./api/apiDeleteRoutes");
const {
  updateTaskApi,
  updateTaskWithStatus,
  updateTaskWithDetail,
  updateProjectApi,
  updateColumnName,
  updatePagesApi,
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
  getColumns,
  deleteColumn,
  updateColumnName,
  createPages,
  getPagesApi,
  deletePagesApi,
  updatePagesApi,
};
