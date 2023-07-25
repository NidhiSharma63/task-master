const Project = require("../../models/projectsSchema");
const Task = require("../../models/taskSchema");

const getProjectApi = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId.trim()) {
      res.status(400).json({ error: "User id is required" });
    }
    const project = await Project.find({ userId });

    res.status(201).json({ projects: project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTaskInTodoApi = async (req, res) => {
  try {
    const { userId } = req.query;

    // filter the task based on userID and return all the task
    // that have status Todod
    const allTask = await Task.find({ userId, status: "Todo" });
    res.status(200).json({ data: allTask });
  } catch (error) {
    res.status(500).json({ msg: "It's not you. It's me!" });
  }
};

const getAllTaskInProgressApi = async (req, res) => {
  try {
    const { userId } = req.query;

    // filter the task based on userID and return all the task
    // that have status Todod
    const allTask = await Task.find({ userId, status: "In progress" });
    res.status(200).json({ data: allTask });
  } catch (error) {
    res.status(500).json({ msg: "It's not you. It's me!" });
  }
};

const getAllTaskInPriorityApi = async (req, res) => {
  try {
    const { userId } = req.query;

    // filter the task based on userID and return all the task
    // that have status Todod
    const allTask = await Task.find({ userId, status: "In priority" });
    res.status(200).json({ data: allTask });
  } catch (error) {
    res.status(500).json({ msg: "It's not you. It's me!" });
  }
};

const getAllTaskInDoneApi = async (req, res) => {
  try {
    const { userId } = req.query;

    // filter the task based on userID and return all the task
    // that have status Todod
    const allTask = await Task.find({ userId, status: "Done" });
    res.status(200).json({ data: allTask });
  } catch (error) {
    res.status(500).json({ msg: "It's not you. It's me!" });
  }
};

module.exports = {
  getProjectApi,
  getAllTaskInTodoApi,
  getAllTaskInProgressApi,
  getAllTaskInPriorityApi,
  getAllTaskInDoneApi,
};
