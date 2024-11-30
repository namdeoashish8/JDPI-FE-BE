const express = require('express')
const router = express.Router()
const { addEmployee, deactivateEmployee, fetchEmployee, getAttendanceForEmployee, updateEmloyee } = require('../controllers/StaffController')

router.post('/addEmployee', addEmployee)
router.put('/updateEmployee', updateEmloyee)
router.put('/deactivate', deactivateEmployee)
router.get('/getEmployee', fetchEmployee)
module.exports = router