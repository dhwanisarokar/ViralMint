const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: Object, required: true }, // Object to store block editor content
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true },
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
