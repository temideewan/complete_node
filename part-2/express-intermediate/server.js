require('dotenv').config();

const express = require('express');
const  configureCors = require('./config/corsConfig.js');
const {
  requestLogger,
  addTimeStamp,
} = require('./middleware/customMiddleware');
const { globalErrorHandler } = require('./middleware/errorHandler.js');
const { urlVersioning } = require('./middleware/apiVersioning.js');

const app = express();
const port = process.env.PORT || 3000;

// express json middleware
app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors());
app.use(express.json());

app.use('/api/v1', urlVersioning('v1'));

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server now listening on port: ${port}`);
});
