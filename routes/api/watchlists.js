const express = require('express');
const router = express.Router();
const watchlistsCtrl = require('../../controllers/api/watchlists');
// require the authorization middleware function
const verifyLoggedIn = require('../../config/verifyLoggedIn');

router.get('/', verifyLoggedIn, watchlistsCtrl.index);
router.get('/favs', verifyLoggedIn, watchlistsCtrl.getFavs)
router.get('/:id', verifyLoggedIn, watchlistsCtrl.getOne)
router.post('/create', verifyLoggedIn, watchlistsCtrl.create)
router.put('/update/:id', verifyLoggedIn, watchlistsCtrl.update)
router.put('/:id/add/:cid', verifyLoggedIn, watchlistsCtrl.addCoin)
router.delete('/delete/:id', verifyLoggedIn, watchlistsCtrl.deleteOne)
router.put('/deleteCoin', verifyLoggedIn, watchlistsCtrl.deleteCoin)

module.exports = router;