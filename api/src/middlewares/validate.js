const Joi = require('joi');
const httpStatus = require('http-status');
const { pick } = require('lodash');
const { ApiError } = require('../utils');

const validate = schema => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }})
    .validate(object);

  if (error) {
    const errorMessage = error.details.map(detail => detail.message.join(', '));
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;