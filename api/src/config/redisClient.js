const redis = require('redis');
const logger = require('./logger');

const redisClient = redis.createClient();

redisClient.on('connect', () => {
  logger.info('Redis client connected');
});

redisClient.on('ready', () => {
  logger.info('Client connected to redis and ready to use...');
});

redisClient.on('error', (error) => {
  logger.error(error);
});

redisClient.on('end', () => {
  logger.info('Client disconnected from redis');
});

process.on('SIGINT', () => {
  redisClient.quit();
});

process.on('exit', () => {
  redisClient.quit();
});

module.exports = redisClient;