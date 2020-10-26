const ballDontLieRouter = require('express').Router();
const { validate } = require('../../middlewares');
const { ballDontLieController } = require('../../controllers');
const { ballDontLieValidation } = require('../../validations');

ballDontLieRouter.get('/players', validate(ballDontLieValidation.playerSearch), ballDontLieController.getPlayers);

module.exports = ballDontLieRouter;
