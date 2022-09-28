const express = require('express');
const router = express.Router();
const monstersCtrl = require('../../controllers/monsters');

// /*---------- Public Routes ----------*/
router.post('/', monstersCtrl.create);
// GET /api/monsters
router.get('/', monstersCtrl.index);
// UPDATE /api/monsters
router.put('/:id', monstersCtrl.update);
// DELTE /api/monsters
router.delete('/:id', monstersCtrl.delete);
/*---------- Protected Routes ----------*/




module.exports = router;