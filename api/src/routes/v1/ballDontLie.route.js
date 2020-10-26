const ballDontLieRouter = require('express').Router();
const { validate } = require('../../middlewares');
const { ballDontLieController } = require('../../controllers');
const {} = require('../../validations');

ballDontLieRouter.get('/players', ballDontLieController.getPlayers);

module.exports = ballDontLieRouter;
