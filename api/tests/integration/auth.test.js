const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const moment = require('moment');
const app = require('../../src/app');
const { tokenTypes, tokenConfig } = require('../../src/config');
const { User } = require('../../src/models');
const { tokenService } = require('../../src/services');
const { userOne, insertUsers } = require('../fixtures');
const setupTestDb = require('../utils/setupTestDb');

setupTestDb()

describe('Auth routes', () => {
  describe('POST /v1/auth/register', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        username: faker.name.findName(),
        password: 'password1'
      };
    });

    test('should return 201 and successfully register user if request data is ok', async () => {
      const res = await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.CREATED);
      expect(res.body.user).not.toHaveProperty('password');
      expect(res.body.user).toEqual({ id: expect.anything(), username: newUser.username });

      const dbUser = await User.findById(res.body.user.id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);
      expect(res.body.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
    });

    test('should return 400 error if username is already used', async () => {
      await insertUsers([userOne]);
      newUser.username = userOne.username;
      await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if password length is less than 8 characters', async () => {
      newUser.password = 'passwo1';

      await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if password does not contain both letters and numbers', async () => {
      newUser.password = 'password';

      await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);

      newUser.password = '11111111';

      await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('POST /v1/auth/login', () => {
    test('should return 200 and login user if username and password match', async () => {
      await insertUsers([userOne]);
      const loginCredentials = {
        username: userOne.username,
        password: userOne.password,
      };
  
      const res = await request(app).post('/v1/auth/login').send(loginCredentials).expect(httpStatus.OK);
  
      expect(res.body.user).toEqual({
        id: expect.anything(),
        username: userOne.username,
      });
  
      expect(res.body.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
    });
  
    test('should return 401 error if there are no users with that username', async () => {
      const loginCredentials = {
        username: userOne.username,
        password: userOne.password,
      };
  
      const res = await request(app).post('/v1/auth/login').send(loginCredentials).expect(httpStatus.UNAUTHORIZED);
  
      expect(res.body).toEqual({ code: httpStatus.UNAUTHORIZED, message: 'Incorrect username or password' });
    });
  
    test('should return 401 error if password is wrong', async () => {
      await insertUsers([userOne]);
      const loginCredentials = {
        username: userOne.username,
        password: 'wrongPassword1',
      };
  
      const res = await request(app).post('/v1/auth/login').send(loginCredentials).expect(httpStatus.UNAUTHORIZED);
  
      expect(res.body).toEqual({ code: httpStatus.UNAUTHORIZED, message: 'Incorrect username or password' });
    });
  });

  describe('POST /v1/auth/logout', () => {
    test('should return 204 if refresh token is valid', async () => {
      await insertUsers([userOne]);
      const expires = moment().add(tokenConfig.refreshExpirationDays, 'days');
      const refreshToken = tokenService.generateToken(userOne._id, expires, tokenTypes.REFRESH, tokenConfig.refreshSecret);

      await request(app).post('/v1/auth/logout').send({ refreshToken }).expect(httpStatus.NO_CONTENT);

      const isBlackListed = await tokenService.searchBlacklistTokens(refreshToken);
      expect(isBlackListed).toBe(true);
    });

    test('should return 400 error if refresh token is missing from request body', async () => {
      await request(app).post('/v1/auth/logout').send().expect(httpStatus.BAD_REQUEST);
    });
  });


  describe('POST /v1/auth/refreshTokens', () => {
    test('should return 200 and new auth tokens if refresh token is valid', async () => {
      await insertUsers([userOne]);
      const expires = moment().add(tokenConfig.refreshExpirationDays, 'days');
      const refreshToken = tokenService.generateToken(userOne._id, expires, tokenTypes.REFRESH, tokenConfig.refreshSecret);
  
      const res = await request(app).post('/v1/auth/refreshTokens').send({ refreshToken }).expect(httpStatus.OK);
      
      expect(res.body).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
  
      const refreshTokenIsBlackListed = await tokenService.searchBlacklistTokens(refreshToken);
      expect(refreshTokenIsBlackListed).toEqual(true);
    });
  
    test('should return 400 error if refresh token is missing from request body', async () => {
      await request(app).post('/v1/auth/refreshTokens').send().expect(httpStatus.BAD_REQUEST);
    });
  
    test('should return 401 error if refresh token is signed using an invalid secret', async () => {
      await insertUsers([userOne]);
      const expires = moment().add(tokenConfig.refreshExpirationDays, 'days');
      const refreshToken = tokenService.generateToken(userOne._id, expires, tokenTypes.REFRESH, 'invalidSecret');
  
      await request(app).post('/v1/auth/refreshTokens').send({ refreshToken }).expect(httpStatus.UNAUTHORIZED);
    });
  
    test('should return 401 error if refresh token is blacklisted', async () => {
      await insertUsers([userOne]);
      const expires = moment().add(tokenConfig.refreshExpirationDays, 'days');
      const refreshToken = tokenService.generateToken(userOne._id, expires, tokenTypes.REFRESH, tokenConfig.refreshSecret);
      await request(app).post('/v1/auth/refreshTokens').send({ refreshToken });
  
      await request(app).post('/v1/auth/refreshTokens').send({ refreshToken }).expect(httpStatus.UNAUTHORIZED);
    });
  
    test('should return 401 error if refresh token is expired', async () => {
      await insertUsers([userOne]);
      const expires = moment().subtract(1, 'minutes');
      const refreshToken = tokenService.generateToken(userOne._id, expires, tokenTypes.REFRESH, tokenConfig.refreshSecret);
  
      await request(app).post('/v1/auth/refreshTokens').send({ refreshToken }).expect(httpStatus.UNAUTHORIZED);
    });
  
    test('should return 401 error if user is not found', async () => {
      const expires = moment().add(tokenConfig.refreshExpirationDays, 'days');
      const refreshToken = tokenService.generateToken(userOne._id, expires, tokenTypes.REFRESH, tokenConfig.refreshSecret);
  
      await request(app).post('/v1/auth/refreshTokens').send({ refreshToken }).expect(httpStatus.UNAUTHORIZED);
    });
  });
});