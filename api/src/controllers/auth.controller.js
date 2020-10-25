const httpStatus = require('http-status');
const { userService, tokenService } = require('../services');
const { catchAsync } = require('../utils');

const register = catchAsync( async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = tokenService.generateAuthTokens(user)
  const response = {
    succes: true,
    user: user.transform(),
    tokens
  };
  res.status(httpStatus.CREATED).send(response);
});

module.exports = {
  register
};