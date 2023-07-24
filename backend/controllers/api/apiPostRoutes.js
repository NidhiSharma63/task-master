const Project = require("../../models/projectsSchema");

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
    const taskObj = req.body;
    console.log(taskObj);
    res.send("Hi");
  } catch (error) {}
};

module.exports = {
  createProjectApi,
  createTaskApi,
};
