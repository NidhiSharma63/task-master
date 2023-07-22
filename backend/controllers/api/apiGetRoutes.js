const express = require("express");
const Project = require("../../models/projectsSchema");

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

module.exports = {
  getProjectApi,
};
