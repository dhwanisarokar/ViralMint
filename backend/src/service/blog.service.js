const Blog = require("../models/blog.model");

const fetchBlogs = async (location) => {
  return await Blog.find({ location });
};

const fetchBlogByID = async (id) => {
  return await Blog.findById({ _id: id });
};

const createBlog = async ({ title, content, location, createdBy }) => {
  return await Blog.create({
    title,
    content,
    location,
    createdBy,
  });
};

const updateBlog = async (id, blog) => {
  return await Blog.findByIdAndUpdate(id, blog);
};

module.exports = {
  fetchBlogs,
  fetchBlogByID,
  createBlog,
  updateBlog,
};
