module.exports = {
  ...require('./error'),
  validate: require('./validate'),
  authLimiter: require('./rateLimiter'),
};