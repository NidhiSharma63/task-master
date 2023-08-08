const Column = require("../../models/columnsSchema");
const Project = require("../../models/projectsSchema");
const Task = require("../../models/taskSchema");
const generateRandomColor = require("../../utils/getRandomColor");

/**
 * Create Project
 */
const createProjectApi = async (req, res, next) => {
  try {
    const { userId, name } = req.body;

    if (!name) {
      throw new Error("Project name is required");
    }

    // check if user added the project already or not
    const isProjectAlreadyPresent = await Project.findOne({ userId, name });

    if (isProjectAlreadyPresent) {
      throw new Error("Project is already present");
    }

    const project = new Project({
      userId,
      name,
      color: generateRandomColor(),
    });

    /**
     * create four basic columns
     */
    const columns = new Column({
      projectName: name,
      userId,
      name: "Todo",
    });

    await project.save();
    res.status(201).json({ data: { id: project._id, name } });
    // await Task.deleteMany({
    //   projectName: { $exists: true },
    // });
  } catch (error) {
    next(error);
  }
};

/**
 * Create task
 */

const createTaskApi = async (req, res, next) => {
  try {
    const taskBody = req.body;

    const { index, projectName } = taskBody;

    if (index === undefined) {
      throw new Error("Index is not present");
    }
    // get the project and it's color
    const project = await Project.findOne({ name: projectName });

    // Save the new task
    const taskObj = new Task({
      ...taskBody,
      color: project.color,
    });

    // Find all tasks next to the current posted task
    const allTaskNextToCurrentTask = await Task.find({
      index: { $gte: index },
      status: taskBody.status,
      userId: taskBody.userId,
    });

    // Update the index of the found tasks and save them
    const updateTasksPromises = allTaskNextToCurrentTask?.map(async (item) => {
      item.index = item.index + 1;
      await item.save();
    });
    await Promise.all(updateTasksPromises);

    await taskObj.save();

    res.json({ data: taskObj });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createProjectApi,
  createTaskApi,
};
