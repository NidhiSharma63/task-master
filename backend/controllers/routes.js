// Exporting all routes here

const {
  getAllUserTodo,
  registerUser,
  loginUser,
  logout,
} = require("./auth/authRoutes");

const { createProjectApi, createTaskApi } = require("./api/apiPostRoutes");
const { getProjectApi } = require("./api/apiGetRoutes");
const { deleteProjectApi } = require("./api/apiDeleteRoutes");

module.exports = {
  getAllUserTodo,
  registerUser,
  loginUser,
  logout,
  createProjectApi,
  getProjectApi,
  deleteProjectApi,
  createTaskApi,
};
