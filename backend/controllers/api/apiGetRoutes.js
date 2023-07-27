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

const getAllTaskAccordingToStatusApi = async (req, res) => {
  try {
    const { userId, status, projectName } = req.query;

    // filter the task based on userID and return all the task
    // that have status Todod
    const allTask = await Task.find({
      userId,
      status: status,
      projectName,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json({ data: allTask, status: status });
  } catch (error) {
    res.status(500).json({ msg: "It's not you. It's me!" });
  }
};

module.exports = {
  getProjectApi,
  getAllTaskAccordingToStatusApi,
};
