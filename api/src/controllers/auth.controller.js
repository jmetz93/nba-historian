const httpStatus = require('http-status');
const { userService } = require('../services');

const register = async (req, res) => {
  console.log('register request: ', req.body);
  const user = await userService.createUser(req.body);
  const response = {
    succes: true,
    user: user.transform()
  };
  res.status(httpStatus.CREATED).send(response);
};

module.exports = {
  register
};