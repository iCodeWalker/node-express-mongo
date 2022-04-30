// We create model in mongoose in order to create documents using it. And also too update query and delete documents

// In order to create model we need schema.

// To specify a schema for our data.
const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  // name: String,
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  // rating: Number,
  rating: {
    type: Number,
    default: 4.5,
  },
  // price:Number,
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
