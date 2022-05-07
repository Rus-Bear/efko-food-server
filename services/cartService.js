const fs = require("fs");

const ApiError = require('../exceptions/apiError')

class CartService {
    async sendToFileInfo(products, ceilParam, ceilFunc, userInfo) {
        if (products.length < 2) {
            throw ApiError.BadRequest('Необходимо выбрать более 1 продукта')
        }

        const ceilFuncSign = ceilFunc === 'min' ? -1 : 1
        let normalCalories;
        let kfa;

        switch (userInfo.lifestyle) {
            case 'low':
                kfa = 1
                break
            case 'average':
                kfa = 1.3
                break
            case 'high':
                kfa = 1.5
                break
            default:
                kfa = 1
                break
        }

        if (userInfo.gender === 'male') {
            if (userInfo.age <= 30) {
                normalCalories = (0.063 * userInfo.weight + 2.896) * 240 * kfa
            } else if (userInfo.age > 30 && userInfo.age <= 60) {
                normalCalories = (0.484 * userInfo.weight + 3.653) * 240 * kfa
            } else if (userInfo.age > 60) {
                normalCalories = (0.491 * userInfo.weight + 2.459) * 240 * kfa
            }
        } else {
            if (userInfo.age <= 30) {
                normalCalories = (0.062 * userInfo.weight + 2.036) * 240 * kfa
            } else if (userInfo.age > 30 && userInfo.age <= 60) {
                normalCalories = (0.034 * userInfo.weight + 3.538) * 240 * kfa
            } else if (userInfo.age > 60) {
                normalCalories = (0.038 * userInfo.weight + 2.755) * 240 * kfa
            }
        }

        const normals = {
            proteins: normalCalories / 26.666,
            njk: normalCalories / 90.002,
            carbohydrates: normalCalories / 7.272
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