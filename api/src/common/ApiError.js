'use strict';

module.exports = function AppError(httpStatus, message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.status = httpStatus;
  this.message = message;
};

require('util').inherits(module.exports, Error);
