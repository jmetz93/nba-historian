const http = require('http');
const { port } = require('./config');

const server = http.createServer();

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

