const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project Name is required"],
  },
  userId: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
});

const Project = new mongoose.model("Project", projectSchema);

module.exports = Project;
