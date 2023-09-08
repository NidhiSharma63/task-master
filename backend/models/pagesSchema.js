const mongoose = require("mongoose");
const pageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Page Name is required"],
  },
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
});

const Page = new mongoose.model("Page", pageSchema);

module.exports = Page;
