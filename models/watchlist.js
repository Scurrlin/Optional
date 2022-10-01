const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
		name: {
			type: String,
			required: true,
		},
		coins: {
			type: Array,
            default: [],
		},
		isDefault: {
			type: Boolean,
			default: false
		}
	},
	{
		minimize:false,
		timestamps: true,
	}
);

module.exports = mongoose.model('Watchlist', watchlistSchema);