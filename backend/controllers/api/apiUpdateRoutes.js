const Task = require("../../models/taskSchema");

const updateTaskApi = async (req, res) => {
  try {
    const taskBody = req.body;
    const {
      _id,
      userId,
      index: previousIndex,
      currentIndex,
      status,
      projectName,
    } = taskBody;
    // const taskObj = await Task.findOne({ _id, userId });
    if (currentIndex === undefined || previousIndex === undefined) {
      throw new Error("Something is missing currentIndex or previousIndex");
    }

    if (currentIndex > previousIndex) {
      const tasksInRange = await Task.find({
        userId,
        status: status,
        projectName,
        index: { $gt: previousIndex, $lte: currentIndex },
      });

      // Update the index of the found tasks and save them
      const updateTasksPromises = tasksInRange?.map(async (item) => {
        item.index = item.index - 1;
        await item.save();
      });

      await Promise.all(updateTasksPromises);
    }
    if (currentIndex < previousIndex) {
      const tasksInRange = await Task.find({
        userId,
        status: status,
        projectName,
        index: { $gte: currentIndex, $lt: previousIndex },
      });
      // Update the index of the found tasks and save them
      const updateTasksPromises = tasksInRange?.map(async (item) => {
        item.index = item.index + 1;
        await item.save();
      });

      await Promise.all(updateTasksPromises);
    }
    // now update the original task as well
    const taskObj = await Task.findOne({ _id, userId });
    taskObj.index = currentIndex;
    await taskObj.save();
    res.json({ data: taskObj });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateTaskWithStatus = async (req, res) => {
  try {
    const { status, currentIndex, projectName, userId, _id } = req.body;
    if (currentIndex === undefined || status === undefined) {
      throw new Error("Something is missing currentIndex or previousIndex");
    }
    // find all related to project of that user according to status
    const allProjectRelatedToStatus = await Task.find({
      status,
      userId,
      projectName,
      index: { $gte: currentIndex },
    });
    if (allProjectRelatedToStatus.length > 0) {
      const updateTasksPromises = allProjectRelatedToStatus?.map(
        async (item) => {
          item.index = item.index + 1;
          await item.save();
        }
      );

      await Promise.all(updateTasksPromises);
    }

    // find the updated task
    const taskObj = await Task.findOne({ _id });
    taskObj.status = status;
    taskObj.index = currentIndex;
    await taskObj.save();

    res.json({ data: taskObj });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateTaskWithDetail = async (res, req) => {
  try {
    const taskBody = req.body;
    const { _id, userId } = taskBody;
    const taskObj = await Task.findOne({ _id, userId });

    if (!taskObj) {
      throw new Error("Task not found!");
    }
    taskObj.task = taskBody.task;
    taskObj.status = taskBody.status;
    taskObj.dueDate = taskBody.dueDate;
    taskObj.description = taskBody.description;

    await taskObj.save();
    res.json({ data: taskObj });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  updateTaskApi,
  updateTaskWithStatus,
  updateTaskWithDetail,
};
