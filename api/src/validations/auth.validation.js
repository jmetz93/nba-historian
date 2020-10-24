const Joi = require('joi');

const register = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string()
      .required()
      .min(8)
      .custom((value, helpers) => {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          return helpers.message('Password must contain at least one letter and one number');
        }
        return value;
      }),
  }),
};

module.exports = {
  register
};