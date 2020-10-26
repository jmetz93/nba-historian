const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');

const routes = require('./routes/v1');
const { ApiError } = require('./utils');
const { errorConverter, errorHandler, authLimiter } = require('./middlewares');
const { env, morgan } = require('./config');

const app = express();

if (env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security http headers
app.use(helmet());

// parse json req body and url encoded req body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sanitize req data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// limit repeated failed requests to auth endpoints
if (env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError if needed
app.use(errorConverter);

// handle error
app.use(errorHandler)

module.exports = app;
