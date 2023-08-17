const Column = require("../../models/columnsSchema");
const Project = require("../../models/projectsSchema");
const Task = require("../../models/taskSchema");
const generateRandomColor = require("../../utils/getRandomColor");

/**
 * Create Project
 */
const createProjectApi = async (req, res, next) => {
  try {
    const { userId, name, color: colorName } = req.body;
    let projectColor = colorName;

    if (!name) {
      throw new Error("Project name is required");
    }

    // check if user added the project already or not
    const isProjectAlreadyPresent = await Project.findOne({ userId, name });

    if (isProjectAlreadyPresent) {
      throw new Error("Project is already present");
    }

    if (!colorName) {
      projectColor = generateRandomColor();
    }

    const project = new Project({
      userId,
      name,
      color: projectColor,
    });

    /**
     * create four basic columns
     */
    await Column.create([
      {
        name: "Todo",
        projectName: name,
        userId,
        index: 0,
      },
      {
        name: "In priority",
        projectName: name,
        userId,
        index: 1,
      },
      {
        name: "In progress",
        projectName: name,
        userId,
        index: 2,
      },
      {
        name: "Done",
        projectName: name,
        userId,
        index: 3,
      },
    ]);

    await project.save();
    res.status(201).json({ data: { id: project._id, name } });
    // await Task.deleteMany({
    //   projectName: { $exists: true },
    // });

    // await Column.deleteMany({
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

/**
 * Create columns
 */

const createColumnsApi = async (req, res, next) => {
  try {
    const { userId, projectName, name } = req.body;

    // Check if a column with the same name exists for the user
    const existingColumn = await Column.findOne({ userId, name });

    if (existingColumn) {
      return res.status(400).json({
        message: "Column with the same name already exists for the user",
      });
    }

    // Get all columns count
    const totalColumns = await Column.countDocuments();

    // Create column
    const column = new Column({
      userId,
      projectName,
      name,
      index: totalColumns,
    });

    await column.save();

    res.status(201).json({ data: column });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProjectApi,
  createTaskApi,
  createColumnsApi,
};
