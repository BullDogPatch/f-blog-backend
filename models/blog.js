const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URL;

mongoose
  .connect(url)
  .then(() => {
    console.log('connecting to MongoDB:', url);
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Define Blog schema
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

// Set toJSON transform to customize returned object
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Create and export Blog model
module.exports = mongoose.model('Blog', blogSchema);
