const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../../docs/swaggerDef');
const swaggerRouter = require('express').Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.js'],
});

swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

module.exports = swaggerRouter;