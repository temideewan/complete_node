const express = require('express');
const { responseDecorator } = require('./middlewares/response-decorator');
require('dotenv').config();
const appRouter = require('./routes/index');

const app = express();

const PORT = process.env.PORT ?? 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hi there, Welcome to my server');
});

app.use(responseDecorator);
app.use('/api/v1', appRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

// appointment app

// there is profile

// there are appointments

// each appointment is attached to a profile

// profiles have basic user info, name, email, avatar

// appointments have date, time, description, title, location
