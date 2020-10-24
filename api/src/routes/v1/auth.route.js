const authRouter = require('express').Router();
const { validate } = require('../../middlewares');
const { authController } = require('../../controllers');
const { authValidation } = require('../../validations');

authRouter.post('/register', validate(authValidation.register), authController.register);

module.exports = authRouter;