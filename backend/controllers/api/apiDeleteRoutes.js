const express = require("express");
const Project = require("../../models/projectsSchema");

const deleteProjectApi = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id.trim()) {
      res.status(400).json({ error: "Id is required" });
    }
    await Project.findOneAndDelete({ _id: id });

    res.status(204);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  deleteProjectApi,
};
