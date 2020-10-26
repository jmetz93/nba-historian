const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const { 
  port,
  db, 
  logger,
} = require('./config');

const server = http.createServer(app);
mongoose.connect(db.url, db.options)
  .then(() => {
    logger.info('Connected to MongoDB');
    server.listen(port, () => {
      logger.info(`Listening on port: ${port}`);
    });
  })
  .catch((err) => {
    logger.error(`Error connecting to MongoDb: ${err}`);
  });


const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server connection closed');
      process.exit(1);
    })
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});