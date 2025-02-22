const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo = () => {
    try {
        mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Re-throw the error
      }
}

module.exports = connectToMongo;
