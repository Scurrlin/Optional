const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
// require the authorization middleware function
const checkLoggedIn = require('../../config/checkLoggedIn');

router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.get('/check-token', checkLoggedIn, usersCtrl.checkToken);

module.exports = router;