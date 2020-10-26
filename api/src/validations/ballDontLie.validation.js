const Joi = require('joi');

const playerSearch = {
  query: Joi.object().keys({
    player: Joi.string().required(),
    page: Joi.number().required(),
  }),
};

module.exports = {
  playerSearch,
};