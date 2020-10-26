const Joi = require('joi');

const playerSearch = {
  query: Joi.object().keys({
    player: Joi.string().required(),
    page: Joi.number().required(),
  }),
};

const playerStats = {
  query: Joi.object().keys({
    playerId: Joi.string().required()
  }),
};

module.exports = {
  playerSearch,
  playerStats
};