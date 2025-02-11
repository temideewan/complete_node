const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://temideewan:qAZZ95OEpiFxjLiw@cluster0.lv1sq.mongodb.net/')
    console.log('Connected to the Database')
  } catch (error) {
    console.log('MongoDB connection failed')
    process.exit(1)
  }
}
module.exports = connectToDB;
