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

const getUserById = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No user found');
  }
  return user;
}

const getUserByUsername = async username => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect username or password');
  }
  return user;
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserById
};