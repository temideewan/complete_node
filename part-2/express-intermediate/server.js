require('dotenv').config();

const express = require('express');
const configureCors = require('./config/corsConfig.js');
const {
  requestLogger,
  addTimeStamp,
} = require('./middleware/customMiddleware');
const { globalErrorHandler } = require('./middleware/errorHandler.js');
const { urlVersioning } = require('./middleware/apiVersioning.js');
const createBasicRateLimiter = require('./middleware/rateLimiter.js');
const itemRoutes = require('./routes/item-routes.js');

const app = express();
const port = process.env.PORT || 3000;
const maxTimeForRateLimiting = 15 * 60 * 1000; //15 minutes

// express json middleware
app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors());
app.use(createBasicRateLimiter(2, maxTimeForRateLimiting));
app.use(express.json());

app.use('/api/v1', urlVersioning('v1'));
app.use('/api/v1', itemRoutes);

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server now listening on port: ${port}`);
});
