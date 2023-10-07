const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  createdAt: {
    type: Date, // Change type to Date for storing date values
    default: Date.now, // Set the default value to the current date and time
  },
  isNotified: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date, // Change type to Date for storing date values
  },
  description: {
    type: String,
  },
  label: {
    type: String,
  },
  labelColor: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    require: true,
  },
  task: {
    type: String,
    require: true,
  },
  projectName: {
    type: String,
    require: true,
  },
  index: {
    type: Number,
    require: true,
  },
  color: {
    type: String,
  },
  subTasks: [],
  images: [],
});

const Task = new mongoose.model('Task', taskSchema);

module.exports = Task;
