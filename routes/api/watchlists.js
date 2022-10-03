const express = require('express');
const router = express.Router();
const watchlistsCtrl = require('../../controllers/api/watchlists');
// require the authorization middleware function
const checkLoggedIn = require('../../config/checkLoggedIn');

router.get('/', checkLoggedIn, watchlistsCtrl.index);
router.get('/favs', checkLoggedIn, watchlistsCtrl.getFavs)
router.get('/:id', checkLoggedIn, watchlistsCtrl.getOne)
router.post('/create', checkLoggedIn, watchlistsCtrl.create)
router.put('/update/:id', checkLoggedIn, watchlistsCtrl.update)
router.put('/:id/add/:cid', checkLoggedIn, watchlistsCtrl.addCoin)
router.delete('/delete/:id', checkLoggedIn, watchlistsCtrl.deleteOne)
router.put('/deleteCoin', checkLoggedIn, watchlistsCtrl.deleteCoin)

module.exports = router;