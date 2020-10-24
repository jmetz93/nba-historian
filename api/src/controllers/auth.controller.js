const httpStatus = require('http-status');

const register = (req, res) => {
  res.status(httpStatus.CREATED).send('hello')
};

module.exports = {
  register
};