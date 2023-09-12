const Column = require("../../models/columnsSchema");
const Page = require("../../models/pagesSchema");
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
      throw new Error("Something is missing _id, index, userId, status, projectName");
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
      if (item.index > 0) {
        item.index = item.index - 1;
      }
      await item.save();
    });
    await Promise.all(updateTasksPromises);
    rescheduleReminders();
    res.status(204).json({ msg: "Task deleted", task: deletedTask });
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

    /**
     * find the column related to id
     */

    const foundColumn = await Column.findOne({ _id });

    /**
     * update the index of other columns as well
     */
    const foundOtherColumnsNextToDeletedOne = await Column.find({ index: { $gt: foundColumn.index } });

    // Update the index of the found tasks and save them
    const updateColumnsPromises = foundOtherColumnsNextToDeletedOne?.map(async (item) => {
      item.index = item.index - 1;
      await item.save();
    });
    await Promise.all(updateColumnsPromises);

    /**
     * delete the column
     */
    await Column.deleteOne({ _id });

    // delete task related to that column
    await Task.deleteMany({ status: foundColumn.name, userId });
    rescheduleReminders();

    res.status(204).json({ msg: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * delete pages
 */

const deletePagesApi = async (req, res, next) => {
  try {
    const { _id } = req.body;

    /**
     * delete the page
     */
    const deletedPage = await Page.deleteOne({ _id });
    /**
     * now update the index of others
     */
    const foundOtherPagesNextToDeletedOne = await Page.find({ index: { $gt: deletedPage.index } });

    // Update the index of the found tasks and save them
    const updatePagesPromises = foundOtherPagesNextToDeletedOne?.map(async (item) => {
      item.index = item.index - 1;
      await item.save();
    });
    await Promise.all(updatePagesPromises);

    res.status(204).send({ msg: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  deleteProjectApi,
  deleteTaskApi,
  deleteColumn,
  deletePagesApi,
};
