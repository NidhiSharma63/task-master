const Column = require("../../models/columnsSchema");
const Page = require("../../models/pagesSchema");
const Project = require("../../models/projectsSchema");
const Task = require("../../models/taskSchema");

/**
 * Get project Api
 * */
const getProjectApi = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const project = await Project.find({ userId });
    res.status(200).json({ projects: project });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all task api
 */
const getAllTaskAccordingToStatusApi = async (req, res, next) => {
  try {
    const { userId, status, projectName } = req.query;

    if (!userId || !status || !projectName) {
      throw new Error("Some thing is missing in params, check userId, status, projectName");
    }

    // filter the task based on userID and return all the task
    // that have status Todod
    const allTask = await Task.find({
      userId,
      status: status,
      projectName,
    }).sort({
      index: 1,
    });

    res.status(200).json({ data: allTask, status: status });
  } catch (error) {
    next(error);
  }
};

/**
 * Get api for charts for getting all the tasks from all projects
 *
 */

const getAllTaskFromAllProjectAccordingToStatus = async (req, res, next) => {
  try {
    const { status, userId } = req.query;
    if (!status) {
      throw new Error("status is not present");
    }

    if (status === "All") {
      const tasks = await Task.find({ userId, projectName: { $exists: true } });
      return res.status(200).json({ data: tasks });
    }
    // select task according to status
    const tasks = await Task.find({
      status,
      userId,
      projectName: { $exists: true },
    });

    res.status(200).json({ data: tasks });
  } catch (error) {
    next(error);
  }
};
/**
 * get columns
 */

const getColumns = async (req, res, next) => {
  try {
    const { userId, projectName } = req.query;
    if (!projectName) {
      throw new Error(" projectName is not present");
    }

    // select task according to status
    const columns = await Column.find({
      userId,
      projectName,
    }).sort({ index: 1 });

    res.status(200).json({ data: columns });
  } catch (error) {
    next(error);
  }
};

/**
 * pages
 */

const getPagesApi = async (req, res, next) => {
  try {
    const pages = await Page.find().sort({ index: 1 });
    res.status(200).json({ data: pages });
  } catch {
    next(error);
  }
};
module.exports = {
  getProjectApi,
  getAllTaskAccordingToStatusApi,
  getAllTaskFromAllProjectAccordingToStatus,
  getColumns,
  getPagesApi,
};
