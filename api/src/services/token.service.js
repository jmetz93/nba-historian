const jwt = require('jsonwebtoken');
const moment = require('moment');
const { 
  tokenConfig, 
  tokenTypes,
  redisClient,
} = require('../config');

const generateToken = (userId, expires, type, secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const verifyToken = async (token, secret) => {
  const tokenStatus = await checkIfBlacklistToken(token);
  if (tokenStatus.valid) {
    const payload = jwt.verify(token, secret);
    if (!payload) {
      throw new Error('Token not found');
    }
    return payload;
  }
};

const generateAuthTokens = (user) => {
  const accessTokenExpires = moment().add(tokenConfig.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS, tokenConfig.accessSecret);

  const refreshTokenExpires = moment().add(tokenConfig.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH, tokenConfig.refreshSecret);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires
    },
  };
};

const blacklistToken = async (token) => {
  try {
    await redisClient.LPUSH('blacklist_tokens', token);
    return { success: true };
  } catch (error) {
    throw new Error(`Error blacklisting: ${error}`);
  }
};

const checkIfBlacklistToken = async (token) => {
  if (!token) {
    throw new Error('No token provided');
  }
  try {
    const blackListedTokens = await redisClient.LRANGE('blacklist_tokens', 0, -1);
    const tokenIsBlacklisted = blackListedTokens.indexof(token) > -1;
    if (tokenIsBlacklisted) {
      throw new Error('Invalid token');
    }
    return { valid: true };
  } catch (error) {
    throw new Error(`Blacklist check error: ${error}`);
  }
}

module.exports = {
  generateToken,
  verifyToken,
  generateAuthTokens,
  blacklistToken,
  checkIfBlacklistToken
};