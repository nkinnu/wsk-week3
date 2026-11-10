import {validationResult} from 'express-validator';

function validationErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors
      .array()
      .map((error) => error.msg)
      .join(', ');

    const error = new Error(messages);
    error.status = 400;
    return next(error);
  }

  next();
}

function notFoundHandler(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(err.status || 500);

  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
}

export {notFoundHandler, errorHandler, validationErrors};
