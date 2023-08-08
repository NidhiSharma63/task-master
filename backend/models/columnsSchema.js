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
  ProjectName: {
    type: String,
    required: true,
  },
});

const column = new mongoose.model("Column", columnsSchema);

module.exports = Column;
