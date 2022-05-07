const router = require('express').Router()

const controller = require('../controllers/productsController')

router.get('/', controller.getAllProducts)
router.post('/', controller.addProduct)
router.delete('/', controller.deleteProductById)

module.exports = router