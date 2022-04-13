const router = require('express').Router()

const controller = require('../controllers/cartController')

router.post('/', controller.generateCart)

module.exports = router