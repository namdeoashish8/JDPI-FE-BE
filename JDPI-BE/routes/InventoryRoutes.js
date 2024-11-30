const express = require('express');
const router = express.Router();
const {addInventory,viewInventory} = require('../controllers/InventoryController')

router.post('/addInventory',addInventory)
router.get('/viewInventory',viewInventory)
module.exports = router;