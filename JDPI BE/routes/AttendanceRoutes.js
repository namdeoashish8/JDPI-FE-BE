const express = require('express')
const { markAttendance } = require('../controllers/StaffController')
const router = express.Router()

router.post('/mark-attendance', markAttendance)


module.exports = router