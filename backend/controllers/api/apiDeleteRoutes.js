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

const deleteTaskApi = async (req, res, next) => {
  try {
    const { _id, index, userId, status, projectName } = req.body;
    if (!_id || index === undefined || !userId || !status || !projectName) {
      throw new Error(
        "Something is missing _id, index, userId, status, projectName"
      );
    }
    const deletedTask = await Task.deleteOne({ _id });

    // update all the index of the task
    const tasks = await Task.find({
      index: { $gt: index },
      status,
      projectName,
      userId,
    });

    // Update the index of the found tasks and save them
    const updateTasksPromises = tasks?.map(async (item) => {
      item.index = item.index - 1;
      await item.save();
    });
    await Promise.all(updateTasksPromises);

    res.status(201).json({ msg: "Task deleted", task: deletedTask });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteProjectApi,
  deleteTaskApi,
};
