const express = require('express');
const router = express.Router();
const watchlistsCtrl = require('../../controllers/api/watchlists');
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, watchlistsCtrl.index);
router.get('/favs', ensureLoggedIn, watchlistsCtrl.getFavs)
router.get('/:id', ensureLoggedIn, watchlistsCtrl.getOne)
router.post('/create', ensureLoggedIn, watchlistsCtrl.create)
router.put('/update/:id', ensureLoggedIn, watchlistsCtrl.update)
router.put('/:id/add/:cid', ensureLoggedIn, watchlistsCtrl.addCoin)
router.delete('/delete/:id', ensureLoggedIn, watchlistsCtrl.deleteOne)
router.put('/deleteCoin', ensureLoggedIn, watchlistsCtrl.deleteCoin)

module.exports = router;