const httpStatus = require('http-status');
const { User } = require('../models');
const { ApiError } = require('../utils');

const createUser = async userBody => {
  const usernameTaken = await User.isUsernameTaken(userBody.username);
  if (usernameTaken) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }
  const user = await User.create(userBody);
  return user;
};

const getUserByUsername = async username => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Incorrect username or password');
  }
  return user;
};

module.exports = {
  createUser,
  getUserByUsername,
};