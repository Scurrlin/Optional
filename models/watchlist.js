const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId },
  stocks: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },
});

module.exports = mongoose.model('Watchlist', watchlistSchema);