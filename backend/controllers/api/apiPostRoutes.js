const Project = require("../../models/projectsSchema");
const Task = require("../../models/taskSchema");

const createProjectApi = async (req, res) => {
  try {
    const { userId, name } = req.body;

    if (!name.trim()) {
      res.status(400).json({ error: "Project name is required" });
    }

    // check if user added the project already or not
    const isProjectAlreadyPresent = await Project.findOne({ userId, name });

    if (isProjectAlreadyPresent) {
      throw new Error("Project is already present");
    }
    const project = new Project({
      userId,
      name,
    });

    await project.save();
    res.status(201).json({ data: { userId, name } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createTaskApi = async (req, res) => {
  try {
    const taskBody = req.body;

    const { index } = taskBody;
    // Save the new task
    const taskObj = new Task({
      ...taskBody,
    });

    // Find all tasks next to the current posted task
    const allTaskNextToCurrentTask = await Task.find({
      index: { $gte: index },
      status: taskBody.status,
      userId: taskBody.userId,
    });

    console.log(allTaskNextToCurrentTask, "::all task that have greater index");
    // Update the index of the found tasks and save them
    const updateTasksPromises = allTaskNextToCurrentTask?.map(async (item) => {
      item.index = item.index + 1;
      await item.save();
    });
    await Promise.all(updateTasksPromises);

    await taskObj.save();
    res.json({ data: taskObj });
  } catch (error) {
    res.status(500).json({ msg: "It's me not you" });
  }
};
module.exports = {
  createProjectApi,
  createTaskApi,
};
