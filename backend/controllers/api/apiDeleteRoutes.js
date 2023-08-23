const Column = require("../../models/columnsSchema");
const Project = require("../../models/projectsSchema");
const Task = require("../../models/taskSchema");
const rescheduleReminders = require("../../utils/setSchedule");
/**
 * Project delete
 */
const deleteProjectApi = async (req, res, next) => {
  try {
    const { id, userId } = req.body;

    if (!id) {
      throw new Error("Project id is required");
    }
    const project = await Project.findOneAndDelete({ _id: id });

    if (!project) {
      throw new Error("Invalid project id");
    }
    const projects = await Project.find();

    // delete task related to that project
    await Task.deleteMany({ projectName: project.name, userId });

    // delete columns as well

    await Column.deleteMany({ projectName: project.name, userId });

    rescheduleReminders();
    res.status(204).json({ projects });
  } catch (error) {
    next(error);
  }
};

/**
 * Task delete
 */
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
    rescheduleReminders();
    res.status(201).json({ msg: "Task deleted", task: deletedTask });
  } catch (error) {
    next(error);
  }
};

/**
 * Column delete
 */

const deleteColumn = async (req, res, next) => {
  try {
    const { _id, userId } = req.body;
    const col = await Column.deleteOne({ _id });
    // delete task related to that column
    await Task.deleteMany({ status: col.name, userId });
    res.status(200).json({ msg: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteProjectApi,
  deleteTaskApi,
  deleteColumn,
};
