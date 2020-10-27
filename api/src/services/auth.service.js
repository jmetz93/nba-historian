const httpStatus = require('http-status');
const userService = require('./user.service');
const tokenService = require('./token.service');
const { ApiError } = require('../utils');
const { verifyToken } = require('./token.service');
const { tokenConfig } = require('../config');

/**
 * Login with username and password
 * @param {string} username
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginWithUsernameAndPassword = async (username, password) => {
  const user = await userService.getUserByUsername(username);
  const validPassword = await user.isPasswordMatch(password);
  if (!user || !validPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect username or password');
  }
  return user;
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const tokenPayload = await verifyToken(refreshToken, tokenConfig.refreshSecret);
    const user = await userService.getUserById(tokenPayload.sub);
    if (!user) {
      throw new Error();
    }
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    // throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    return { message: 'Not authenticated' };
  }
}

module.exports = {
  loginWithUsernameAndPassword,
  refreshAuth
};