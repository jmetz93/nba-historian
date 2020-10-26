const faker = require('faker');
const { User } = require('../../../src/models');

describe('User model', () => {
  describe('User validation', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        username: faker.name.findName(),
        password: 'password1',
      };
    });

    test('should correctly validate a valid user', async () => {
      await expect(new User(newUser).validate()).resolves.toBeUndefined()
    });

    test('should throw a validation error if password length is less than 8 characters', async () => {
      newUser.password = 'passwo1';
      const user = await new User(newUser);
      expect(user.validate()).rejects.toThrow();
    });

    test('should throw a validation error if password does not contain numbers', async () => {
      newUser.password = 'password';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test('should throw a validation error if password does not contain letters', async () => {
      newUser.password = '11111111';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });
  });

  describe('User toJSON()', () => {
    test('should not return user password when toJSON is called', () => {
      const newUser = {
        username: faker.name.findName(),
        password: 'password1',
      };
      expect(new User(newUser).toJSON()).not.toHaveProperty('password');
    });
  });
});