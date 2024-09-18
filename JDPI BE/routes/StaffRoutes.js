const express = require('express')
const router = express.Router()
const { addEmployee, deactivateEmployee } = require('../controllers/StaffController')

router.post('/addEmployee', addEmployee)
router.post('/deactivate', deactivateEmployee)
module.exports = router