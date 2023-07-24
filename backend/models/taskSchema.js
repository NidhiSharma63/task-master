const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  data: {
    type: Date, // Change type to Date for storing date values
    default: Date.now, // Set the default value to the current date and time
  },
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    require: true,
  },
});

const Task = new mongoose.model("Task", taskSchema);

module.exports = Task;
