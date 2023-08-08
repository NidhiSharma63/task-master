const mongoose = require("mongoose");
const columnsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
});

const Column = new mongoose.model("Column", columnsSchema);

module.exports = Column;
