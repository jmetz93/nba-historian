const httpStatus = require('http-status');
const userService = require('./user.service');
const tokenService = require('./token.service');
const { ApiError } = require('../utils');

const loginWithUsernameAndPassword = async (username, password) => {
  const user = await userService.getUserByUsername(username);
  const validPassword = await user.isPasswordMatch(password);
  if (!user || !validPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect username or password');
  }
  return user;
};

const logout = async (refreshToken) => {
  return await tokenService.blacklistToken(refreshToken);
};

module.exports = {
  loginWithUsernameAndPassword,
  logout
};