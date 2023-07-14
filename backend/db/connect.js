const mongoose = require("mongoose");

const connectDB = async (uri) => {
  return mongoose.connect(uri, {});
};

module.exports = connectDB;
