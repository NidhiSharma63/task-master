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

module.exports = {
  updateTaskApi,
};
