const express = require('express')
const router = express.Router()

const cardController = require('../controllers/cards')

router.post( '/', cardController.saveCard)
router.delete( '/', cardController.removeCard)

module.exports = router