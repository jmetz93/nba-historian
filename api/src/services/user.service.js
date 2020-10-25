const httpStatus = require('http-status');
const { User } = require('../models');
const { ApiError } = require('../utils');

const checkDuplicateUsername = async (username, excludeId) => {
  const user = await User.findOne({ username, _id: { $ne: excludeId }});
  if (user) {
    throw new ApiError('Username is already taken');
  }
};

const createUser = async userBody => {
  await checkDuplicateUsername(userBody.username);
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
  getUserByUsername
};