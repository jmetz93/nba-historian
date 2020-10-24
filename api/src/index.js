const http = require('http');
const app = require('./app');
const { port, logger } = require('./config');

const server = http.createServer(app);

server.listen(port, () => {
  logger.info(`Listening on port: ${port}`);
});

