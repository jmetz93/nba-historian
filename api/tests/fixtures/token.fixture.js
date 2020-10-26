
const moment = require('moment');
const { tokenTypes, tokenConfig } = require('../../src/config');
const { tokenService }= require('../../src/services');
const { userOne } = require('./user.fixture');

const accessTokenExpires = moment().add(tokenConfig.accessExpirationMinutes, 'minutes');
const userOneAccessToken = tokenService.generateToken(userOne._id, accessTokenExpires, tokenTypes.ACCESS, tokenConfig.accessSecret);

module.exports = {
  userOneAccessToken
};