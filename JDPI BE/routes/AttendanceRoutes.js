const express = require('express')
const { markAttendance, getAttendanceForEmployee } = require('../controllers/StaffController')
const router = express.Router()

router.post('/mark-attendance', markAttendance)
router.get('/view-attendance', getAttendanceForEmployee)


module.exports = router