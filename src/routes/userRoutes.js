const {register, login} = require('../controllers/usersController')
const express = require('express')

const router = express()

router.post('/register',register)
router.post('/login',login)


module.exports = router