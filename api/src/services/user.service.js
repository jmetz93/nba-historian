const { User } = require('../models');

const checkDuplicateUsername = async (username, excludeId) => {
  const user = await User.findOne({ username, _id: { $ne: excludeId }});
  if (user) {
    throw new Error('Username is already taken');
  }
};

const createUser = async userBody => {
  await checkDuplicateUsername(userBody.username);
  const user = await User.create(userBody);
  return user;
};

module.exports = {
  createUser
};