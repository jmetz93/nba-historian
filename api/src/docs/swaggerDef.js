const { version } = require('../../package.json');
const { port } = require('../config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'node-express-mongoose-boilerplate API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-mongoose-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${port}/v1`,
    },
  ],
};

module.exports = swaggerDef;