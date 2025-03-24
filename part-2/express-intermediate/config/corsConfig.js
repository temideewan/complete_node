const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000', //local dev
  'http://www.somecustomdomain.com',
];
const configureCors = () => {
  return cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) != -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by cors'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Version'],
    exposedHeaders: ['X-Total-Count', 'Content-Range'],
    credentials: true, //cookies support
    preflightContinue: false,
    maxAge: 600, //cache preflight responses for 10 mins (600seconds) -> avoid sending options requests multiple times.
    optionsSuccessStatus: 204
  });
};

module.exports = configureCors;
