const logger = require('../databases/logger');

const errorHandler = (err, req, res, next) => {
  console.log(`${req.method} ${req.url} - ${err.message}`, { stack: err.stack });
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;