// const cookieParser = require("cookie-parser");

const express = require("express");
const server = express();
// server.use(cookieParser());
const bcrypt = require("bcrypt");
const Project = require("../../models/projectsSchema");

const createProjectApi = async (req, res) => {
  try {
    const { userId, name } = req.body;

    if (!name.trim()) {
      res.status(400).json({ error: "Project name is required" });
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

module.exports = {
  createProjectApi,
};
