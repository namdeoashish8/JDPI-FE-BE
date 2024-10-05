const express = require('express')
const router = express.Router()
const { addDispatch} = require('../controllers/SalesController')

router.post('/add-Dispatch', addDispatch)

module.exports = router