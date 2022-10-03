const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
// require the authorization middleware function
const verifyLoggedIn = require('../../config/verifyLoggedIn');

router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.get('/verify-token', verifyLoggedIn, usersCtrl.verifyToken);

module.exports = router;