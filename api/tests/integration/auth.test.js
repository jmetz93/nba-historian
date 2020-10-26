const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const moment = require('moment');
const bcrypt = require('bcrypt');
const app = require('../../src/app');
const { User } = require('../../src/models');
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
