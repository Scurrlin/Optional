const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId },
  cryptos: { type: mongoose.Schema.Types.ObjectId, ref: 'Crypto' },
});

module.exports = mongoose.model('Watchlist', watchlistSchema);