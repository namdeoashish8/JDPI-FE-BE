const express = require('express')
const router = express.Router()
const { addExpense, viewExpense} = require('../controllers/ExpenseController')

router.post('/addExpense', addExpense)
router.post('/viewExpense', viewExpense)

module.exports = router