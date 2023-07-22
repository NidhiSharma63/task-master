const express = require("express");
const Project = require("../../models/projectsSchema");

const deleteProjectApi = async (req, res) => {
  console.log("deleteProjectApi");
  try {
    const { id } = req.body;

    if (!id.trim()) {
      res.status(400).json({ error: "Id is required" });
    }
    await Project.findOneAndDelete({ _id: id });
    const projects = await Project.find();
    console.log(projects, "projects");

    res.status(204);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  deleteProjectApi,
};
