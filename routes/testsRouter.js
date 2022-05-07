const router = require('express').Router()

const controller = require('../controllers/testController')

router.post('/', controller.simplexTest)

module.exports = router