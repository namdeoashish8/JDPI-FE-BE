const express = require('express')
const router = express.Router()
const { addDispatch, viewSales} = require('../controllers/SalesController')

router.post('/add-Dispatch', addDispatch)
router.post('/get-Sales', viewSales)

module.exports = router