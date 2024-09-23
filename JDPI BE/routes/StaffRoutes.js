const express = require('express')
const router = express.Router()
const { addEmployee, deactivateEmployee, fetchEmployee } = require('../controllers/StaffController')

router.post('/addEmployee', addEmployee)
router.post('/deactivate', deactivateEmployee)
router.get('/getEmployee', fetchEmployee)
module.exports = router