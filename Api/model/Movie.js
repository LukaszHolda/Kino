// Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // Możesz dodać więcej pól związanych z filmem
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
