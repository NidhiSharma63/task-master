const Task = require("../../models/taskSchema");

const updateTaskApi = async (req, res) => {
  try {
    const taskBody = req.body;
    const { _id, userId } = taskBody;
    const taskObj = await Task.findOne({ _id, userId });

    if (!taskObj) {
      throw new Error("Task not found");
    }
    taskObj.task = taskBody.task;
    taskObj.status = taskBody.status;
    taskObj.dueDate = taskBody.dueDate;

    await taskObj.save();
    res.json({ data: taskObj });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  updateTaskApi,
};
