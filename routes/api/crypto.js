const express = require('express');
const router = express.Router();
const crytposCtrl = require('../../controllers/cryptos');

/*---------- Public Routes ----------*/
router.get('/trending', moviesCtrl.fetchTrendingCoins);
router.get('/search', crytposCtrl.cryptoSearch);

/*---------- Protected Routes ----------*/

module.exports = router;