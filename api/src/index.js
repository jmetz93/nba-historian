const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const { 
  port,
  db, 
  logger } = require('./config');

const server = http.createServer(app);

mongoose.connect(db.url, db.options)
  .then(() => {
    logger.info('Connected to MongoDB');
    server.listen(port, () => {
      logger.info(`Listening on port: ${port}`);
    });
  })
  .catch((err) => {
    logger.err(`Error connecting to MongoDb: ${err}`);
  });

