const Project = require("../../models/projectsSchema");
const Task = require("../../models/taskSchema");

const deleteProjectApi = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      throw new Error("Project id is required");
    }
    const project = await Project.findOneAndDelete({ _id: id });

    if (!project) {
      throw new Error("Invalid project id");
    }
    const projects = await Project.find();

    // delete task related to that project
    await Task.deleteMany({ projectName: project.name });

    res.status(204).json({ projects });
  } catch (error) {
    next(error);
  }
};

const deleteTaskApi = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new Error("Task Id is not present");
    }
    const deletedTask = await Task.deleteOne({ _id: id });
    res.status(201).json({ msg: "Task deleted", task: deletedTask });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteProjectApi,
  deleteTaskApi,
};
