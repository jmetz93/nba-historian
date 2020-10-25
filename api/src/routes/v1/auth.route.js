const authRouter = require('express').Router();
const { validate } = require('../../middlewares');
const { authController } = require('../../controllers');
const { authValidation } = require('../../validations');

authRouter.post('/register', validate(authValidation.register), authController.register);
authRouter.post('/login', validate(authValidation.login), authController.loginAttempt);

module.exports = authRouter;