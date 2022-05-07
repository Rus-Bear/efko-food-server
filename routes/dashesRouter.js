const router = require('express').Router()

const controller = require('../controllers/dashesController')

router.post('/', controller.addDash)
router.get('/', controller.getAllDashes)
router.get('/:id', controller.getDashById)

module.exports = router