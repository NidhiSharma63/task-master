const Project = require("../../models/projectsSchema");
const Task = require("../../models/taskSchema");

const deleteProjectApi = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id.trim()) {
      res.status(400).json({ error: "Id is required" });
    }
    await Project.findOneAndDelete({ _id: id });
    const projects = await Project.find();

    res.status(204).json({ projects });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTaskApi = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedTask = await Task.deleteOne({ _id: id });
    res.status(201).json({ msg: "Task deleted", task: deletedTask });
  } catch (error) {
    res.status(500).json({ error: "It's not you. It's me" });
  }
};

module.exports = {
  deleteProjectApi,
  deleteTaskApi,
};
