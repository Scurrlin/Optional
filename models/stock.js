const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    assetPercentage: { type: String, required: true },
    currentPrice: { type: String, required: true },
  }
);

module.exports = mongoose.model('Stock', stockSchema);