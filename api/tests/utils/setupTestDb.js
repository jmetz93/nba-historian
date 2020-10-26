const mongoose = require('mongoose');
const { db, redisClient } = require('../../src/config');

const setupTestDb = () => {
  beforeAll(async () => {
    await mongoose.connect(db.url, db.options);
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(collection => collection.deleteMany()));
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupTestDb;
