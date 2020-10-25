const httpStatus = require('http-status');
const { userService, tokenService, authService } = require('../services');
const { catchAsync } = require('../utils');

const register = catchAsync(async (req, res) => {
  console.log("register")
  const user = await userService.createUser(req.body);
  const tokens = tokenService.generateAuthTokens(user)
  const response = {
    succes: true,
    user: user.transform(),
    tokens
  };
  res.status(httpStatus.CREATED).send(response);
});

const loginAttempt = catchAsync(async (req, res) => {
  console.log('login attemp: ', req.body)
  const { username, password } = req.body;
  const user = await authService.loginWithUsernameAndPassword(username, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await tokenService.blacklistToken(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  loginAttempt,
  logout
};