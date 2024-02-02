const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  // Define other fields as needed
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
