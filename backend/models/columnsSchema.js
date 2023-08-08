const uniqueValidator = require("mongoose-unique-validator");
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

columnsSchema.plugin(uniqueValidator, {
  message: "{VALUE} for {PATH} already exists.",
});
const Column = new mongoose.model("Column", columnsSchema);

module.exports = Column;
