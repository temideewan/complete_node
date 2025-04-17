require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Redis = require("ioredis");
const { rateLimit } = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis')
const helmet = require('helmet');
const mediaRoutes = require('./routes/media-routes');
const errorHandler = require('./middleware/error-handler');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3003;

// redis client
const redisClient = new Redis(process.env.REDIS_URL);

// connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => logger.info('Connected to mongodb'))
  .catch((e) => logger.error('Mongo connection error', e));

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  logger.info(`Request body`, req.body);
  next();
});

// rate limiter for sensitive endpoints on post
/**
 *
 * @param {Number} maxRequests
 * @param {Number} minutes
 * @returns {Function}
 */
const sensitiveEndpointsLimiter = (maxRequests, minutes) => {
  if (isNaN(Number(minutes)))
    throw Error('Please enter a valid number of minutes');
  if (isNaN(Number(maxRequests)))
    throw Error('Please enter a valid number of requests');
  return rateLimit({
    windowMs: minutes * 60 * 1000,
    max: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      logger.warn(`Sensitive endpoint rate limit exceeded for IP ${req.ip}`);
      res.status(429).json({ success: false, message: 'Too many requests' });
    },
    store: new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
    }),
  });
};

// rate limit endpoints
// app.post('/api/media/upload', sensitiveEndpointsLimiter(10, 10));
app.use('/api/media', mediaRoutes);


app.use(errorHandler);
app.listen(PORT, () => {
  logger.info(`Media service is running on port ${PORT}`);
});

// unhandled promise rejection
process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at ${promise}, reason: ${reason}`);
});
