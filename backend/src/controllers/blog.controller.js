const httpStatus = require("http-status");
const geoip = require("geoip-lite");

const catchAsync = require("../utils/catchAsync");
const { blogService } = require("../service");
const ApiError = require("../utils/ApiError");

const getBlogs = catchAsync(async (req, res) => {
  const ip =
    req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const geo = geoip.lookup(ip);
  const location = geo ? geo.country : "Unknown";

  const blogs = await blogService.fetchBlogs(location);

  res.status(200).json(blogs);
});

const getBlogByID = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, "id is required");
  }

  const blog = await blogService.fetchBlogByID(id);
  res.status(httpStatus.OK).json(blog);
});

const createBlog = catchAsync(async (req, res) => {
  const { title, content } = req.body;
  const ip =
    req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const geo = geoip.lookup(ip);
  const location = geo ? geo.country : "Unknown";

  const blog = await blogService.createBlog({
    title,
    content,
    location,
    createdBy: req.user.username,
  });

  res.status(201).json(blog);
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedBlog = await blogService.updateBlog(id, req.body);

  res.status(201).json(updatedBlog);
})

module.exports = {
  createBlog,
  getBlogs,
  getBlogByID,
  updateBlog,
};
