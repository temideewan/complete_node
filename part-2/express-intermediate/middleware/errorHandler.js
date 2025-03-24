// custom error class

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'APIError'; //error type is always set to API Error
  }
}

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack); //log the error stack

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: 'Error',
      message: err.message,
    });
  }
  // some mongo db error occurred while validating models
  else if (err.name == 'ValidationError') {
    return res.status(400).json({
      status: 'Error',
      message: 'Validation error',
    });
  } else {
    return res.status(500).json({
      status: 'Error',
      message: 'An unexpected error occurred',
    });
  }
};

module.exports = {
  ApiError,
  asyncHandler,
  globalErrorHandler,
};
