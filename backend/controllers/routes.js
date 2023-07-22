// Exporting all routes here

const {
  getAllUserTodo,
  registerUser,
  loginUser,
  logout,
} = require("./auth/authRoutes");

const { createProjectApi } = require("./api/apiRoutes");

module.exports = {
  getAllUserTodo,
  registerUser,
  loginUser,
  logout,
  createProjectApi,
};
