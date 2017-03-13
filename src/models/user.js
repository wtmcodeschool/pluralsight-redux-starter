let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  isadmin: Boolean
});

module.exports = mongoose.model('User', UserSchema);
