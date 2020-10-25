module.exports = {
  ...require('./config'),
  logger: require('./logger'),
  morgan: require('./morgan'),
  tokenTypes: require('./tokens'),
  redisClient: require('./redisClient'),
};