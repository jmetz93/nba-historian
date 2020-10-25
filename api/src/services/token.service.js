const jwt = require('jsonwebtoken');
const moment = require('moment');
const { tokenConfig, tokenTypes } = require('../config');

const generateToken = (userId, expires, type, secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const verifyToken = (token, secret) => {
  const payload = jwt.verify(token, secret);
  if (!payload) {
    throw new Error('Token not found');
  }
  return payload;
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

module.exports = {
  generateToken,
  verifyToken,
  generateAuthTokens
};