const jwt = require('jsonwebtoken');
const { reject } = require('lodash');
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
  const tokenValid = await checkIfBlacklistToken(token);
  if (tokenValid) {
    const payload = jwt.verify(token, secret);
    if (!payload) {
      throw new Error('Token not found');
    }
    await blacklistToken(token);
    return payload;
  }
};

const generateAuthTokens = async (user) => {
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
    redisClient.rpush('blacklist_tokens', token);
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
    const blacklistTokenFound = await searchBlacklistTokens(token);
    if (blacklistTokenFound) {
      throw new Error(checkToken.err);
    }
    return true;
  } catch (error) {
    throw new Error(`Blacklist check error: ${error}`);
  }
}

const searchBlacklistTokens = (token) => {
  return new Promise((resolve) => {
    redisClient.lrange('blacklist_tokens', 0, -1, (err, blackListedTokens) => {
      if (err) reject({valid: false, err });
      const tokenIsBlacklisted = blackListedTokens.indexOf(token) > -1;
      if (tokenIsBlacklisted) {
        resolve(true);
      }
      resolve(false);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
  generateAuthTokens,
  blacklistToken,
  checkIfBlacklistToken,
  searchBlacklistTokens
};