require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Redis = require('ioredis');
const { rateLimit } = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const { RedisStore } = require('rate-limit-redis');
const errorHandler = require('./middleware/error-handler');
const logger = require('./utils/logger');
const searchRoutes = require('./routes/search-route.js');

const { connectToRabbitMq, consumeEvent } = require('./utils/rabbitmq.js');
const {
  handlePostCreated,
  handlePostDeleted,
} = require('./eventHandlers/search-event-handlers.js');

const app = express();
const PORT = process.env.PORT || 3004;
const MAX_NUMBER_OF_REQUESTS = 30;
const MINUTES = 10;

// connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => logger.info('Connected to mongodb'))
  .catch((e) => logger.error('Mongo connection error', e));

// redis client
const redisClient = new Redis(process.env.REDIS_URL);

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

app.use(
  '/api/search/posts',
  sensitiveEndpointsLimiter(MAX_NUMBER_OF_REQUESTS, MINUTES)
);

app.use(
  '/api/search',
  (req, res, next) => {
    req.redisClient = redisClient;
    next();
  },
  searchRoutes
);

app.use(errorHandler);

async function startServer() {
  try {
    await connectToRabbitMq();

    // subscribe to events
    await consumeEvent('post.created', handlePostCreated);
    await consumeEvent('post.deleted', handlePostDeleted);
    app.listen(PORT, () => {
      logger.info(`Search service is running on port ${PORT}`);
    });
  } catch (e) {
    logger.error(`Failed to start search service: ${e}`);
    process.exit(1);
  }
}

startServer();
