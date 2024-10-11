const httpStatus = require("http-status");

const { authService, tokenService } = require("../service");
const catchAsync = require("../utils/catchAsync");

const signUp = catchAsync(async (req, res) => {
  const user = await authService.createUser(req.body);
  
  const token = await tokenService.generateAuthTokens(user);

  res
    .status(httpStatus.CREATED)
    .send({ user: { username: user.username, id: user._id }, token });
});

const signIn = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  const user = await authService.loginUser(username, password);
  const token = await tokenService.generateAuthTokens(user);

  res
    .status(httpStatus.OK)
    .send({ user: { username: user.username, id: user._id }, token });
});

module.exports = {
  signUp,
  signIn,
};
