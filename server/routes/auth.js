const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')

router.get( '/facebook', authController.getFbData)
router.get( '/me', authController.sendUserData)

module.exports = router