const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project Name is required"],
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

// Apply the uniqueValidator plugin to the projectSchema
projectSchema.plugin(uniqueValidator, {
  message: "Project name already exists!",
});
const Project = new mongoose.model("Project", projectSchema);

module.exports = Project;
