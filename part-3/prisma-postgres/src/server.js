const express = require('express');
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');
require('dotenv').config();
const promClient = require('prom-client');
const app = express();

app.use(express.json());

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register, prefix: 'default' });

const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total_count',
  help: 'Total number of http requests',
  labelNames: ['method', 'route', 'status'],
});
register.registerMetric(httpRequestCounter);

const PORT = process.env.PORT || 3000;

// middleware to track api requests

app.use((req,res,next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode
    })
  }) 
  next();
})

// expose the /metrics endpoint for prometheus

app.get('/metrics', async(_,res) => {
  res.set('Content-Type', register.contentType)
  res.end(await register.metrics())
})
app.use('/api/author', authorRoutes);
app.use('/api/books', bookRoutes);


app.listen(PORT, () => console.log(`Server is now running at ports: ${PORT}`));
