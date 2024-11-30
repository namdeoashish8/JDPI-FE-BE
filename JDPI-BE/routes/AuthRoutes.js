const express = require('express')
const router = express.Router()
const {signUpUser, loginUser, getProfileInfoByCookie} = require('../controllers/AuthController')

router.post('/signup', signUpUser)
router.post('/login', loginUser)
router.get('/profile', getProfileInfoByCookie)
module.exports = router