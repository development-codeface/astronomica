import logger from '../utils/logger.js';
import { HTTP_STATUS_CODES } from '../config/constants.js';

const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);

  const statusCode = err.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
