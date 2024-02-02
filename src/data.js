const mongoose = require('mongoose');

// Define schema
const dataSchema = new mongoose.Schema({
  name: String,
  // Define other fields as needed
});

// Define model
const MyModel = mongoose.model('MyModel', dataSchema);

module.exports = MyModel;
