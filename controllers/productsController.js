const productsService = require('../services/productsService')

class ProductsController {
    async getAllProducts(req, res, next) {
        try {
            const products = await productsService.getAllProducts()

            res.status(200).json(products)
        } catch (e) {
            next(e)
        }
    }

    async addProduct(req, res, next) {
        try {
            const {name, category, price, calories, params} = req.body

            const product = await productsService.addProduct(name, category, price, calories, params)

            res.status(200).json(product)
        } catch (e) {
            next(e)
        }
    }

    async deleteProductById(req, res, next) {
        try {
            const {id} = req.body

            await productsService.deleteProductById(id)

            res.status(200).json({message: 'Продукт успешно удален'})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ProductsController()