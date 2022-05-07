const Product = require('../models/Product')

class ProductsService {
    async getAllProducts() {
        return Product.find()
    }

    async addProduct(name, category, price, calories, params) {
        return await Product.create({name, category, price, calories, params})
    }

    async deleteProductById(id) {
        await Product.findByIdAndDelete(id)
    }
}

module.exports = new ProductsService()