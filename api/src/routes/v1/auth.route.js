const authRouter = require('express').Router();
const { validate } = require('../../middlewares');
const { authController } = require('../../controllers');
const { authValidation } = require('../../validations');

authRouter.post('/register', validate(authValidation.register), authController.register);
authRouter.post('/login', validate(authValidation.login), authController.loginAttempt);
authRouter.post('/logout', validate(authValidation.logout), authController.logout);
authRouter.post('/refreshTokens', validate(authValidation.refreshTokens), authController.refreshTokens);

module.exports = authRouter;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * path:
 *  /auth/register:
 *    post:
 *      summary: Register as user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - username
 *                - password
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *                  format: password
 *                  minLength: 8
 *                  description: At least one number and one letter
 *              example:
 *                username: fakeusername
 *                password: password1
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/User'
 *                  tokens:
 *                    $ref: '#/components/schemas/AuthTokens'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * path:
 *  /auth/login:
 *    post:
 *      summary: Login
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - username
 *                - password
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *                  format: password
 *              example:
 *                username: fakeusername
 *                password: password1
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/User'
 *                  tokens:
 *                    $ref: '#/components/schemas/AuthTokens'
 *        "401":
 *          description: Invalid username or password
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Invalid username or password
 */

/**
 * @swagger
 * path:
 *  /auth/refreshTokens:
 *    post:
 *      summary: Refresh auth tokens
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - refreshToken
 *              properties:
 *                refreshToken:
 *                  type: string
 *              example:
 *                refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AuthTokens'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 */