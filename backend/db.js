const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://ch21b051:12345687@cluster0.uexoi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
