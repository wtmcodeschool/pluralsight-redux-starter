let mongoose = require('mongoose');

let GifSchema = new mongoose.Schema({
  name: String,
  url: String,
  description: String,
  owner: String
});

module.exports = mongoose.model('Gif', GifSchema);
