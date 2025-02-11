const express = require('express');
const connectDb = require('./database/db');
const todoRouter = require('./routes/todo-routes');

const app = express();


connectDb();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/todo', todoRouter)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
