require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const productRoutes = require("./routes/product-routes")
const bookRoutes = require("./routes/book-routes")



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

  
// Middleware
app.use(express.json());

app.use("/products", productRoutes);
app.use("/reference", bookRoutes);

// listen for http requests

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
