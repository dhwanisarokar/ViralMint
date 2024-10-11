const httpStatus = require("http-status");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");

const createUser = async (user) => {
  if (await User.findOne({ username: user.username }))
    throw new ApiError(httpStatus.OK, "Email already taken");
  else {
    return await User.create(user);
  }
};

const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }

  return user;
};

module.exports = {
  createUser,
  loginUser,
};
