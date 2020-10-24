const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');

const routes = require('./routes/v1');
const { ApiError } = require('./utils');
const { errorConverter, errorHandler } = require('./middlewares');
// console.log('routes stack: ', routes.stack[0].handle.stack[0].route)
const app = express();

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

// send back a 404 error for any unknown api request
// app.use((req, res, next) => {
//   next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
// });

app.use('/v1', routes);

// convert error to ApiError if needed
app.use(errorConverter);

// handle error
app.use(errorHandler)

module.exports = app;
