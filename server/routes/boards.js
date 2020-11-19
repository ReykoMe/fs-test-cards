const express = require('express')
const router = express.Router()
const boardsController = require('../controllers/boards')

router.post('/', boardsController.createBoard)
router.delete('/', boardsController.removeBoard)
// router.delete('/', boardsController.removeBoard)

module.exports = router