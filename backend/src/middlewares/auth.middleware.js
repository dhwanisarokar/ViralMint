const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog.model");
const { userService } = require("../service");
const ApiError = require("../utils/ApiError");
const { blogService } = require("../service");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userService.findUserById(sub);

    if (!user) {
      next(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const checkBlogCreatedByUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await blogService.fetchBlogByID(id);
    if (!blog) {
      next(new ApiError(httpStatus.NOT_FOUND, "Blog not found."));
    }
    const { username } = req.user;

    if (blog.createdBy !== username) {
      next(
        new ApiError(
          httpStatus.UNAUTHORIZED,
          "Your not authorised to update this blog."
        )
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authMiddleware, checkBlogCreatedByUser };
