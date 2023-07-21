// Exporting all routes here

const {
  getAllUserTodo,
  registerUser,
  loginUser,
  logout,
} = require("./auth/authRoutes");

module.exports = {
  getAllUserTodo,
  registerUser,
  loginUser,
  logout,
};
