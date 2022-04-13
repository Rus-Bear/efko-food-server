const fs = require("fs");

const ApiError = require('../exceptions/apiError')

class CartService {
    async sendToFileInfo(products, ceilParam, ceilFunc) {
        if (products.length < 2) {
            throw ApiError.BadRequest('Необходимо выбрать более 1 продукта')
        }

        const ceilFuncSign = ceilFunc === 'min' ? -1 : 1

        const normals = {
            proteins: 82.034,
            njk: 24.306,
            carbohydrates: 300.793
        }
        const otcl = {
            proteins: 16.640,
            njk: 1.134,
            carbohydrates: 10.294
        }

        const ceil = []
        switch (ceilParam) {
            case 'price':
                products.forEach(product => {
                    ceil.push(product.price * ceilFuncSign)
                })
                break;
            case 'calories':
                products.forEach(product => {
                    ceil.push(product.calories * ceilFuncSign)
                })
                break;
            case 'weight':
                products.forEach(product => {
                    ceil.push(ceilFuncSign)
                })
                break;
            default: // price
                products.forEach(product => {
                    ceil.push(product.price * ceilFuncSign)
                })
                break;
        }

        const left = []
        Object.keys(normals).forEach((key) => {
            let constraint = []
            products.forEach((product) => {
                constraint.push(product.params[key])
            })
            left.push(constraint)
        })
        Object.keys(normals).forEach((key) => {
            let constraint = []
            products.forEach((product) => {
                constraint.push(product.params[key] * -1)
            })
            left.push(constraint)
        })

        const right = []
        Object.keys(normals).forEach(key => {
            right.push(normals[key] + otcl[key])
        })
        Object.keys(normals).forEach(key => {
            right.push((normals[key] - otcl[key]) * -1)
        })

        const fileData = JSON.stringify({ ceil, left, right })
        fs.writeFileSync('pythonScripts/input.json', fileData)
    }

}

module.exports = new CartService()