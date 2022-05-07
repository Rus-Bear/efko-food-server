const cartService = require('../services/cartService')

class CartController {
    async generateCart(req, res, next) {
        try {
            const {products, ceilParam, ceilFunc, userInfo} = req.body

            await cartService.sendToFileInfo(products, ceilParam, ceilFunc, userInfo)

            const spawn = require("child_process").spawn;
            const pythonProcess = spawn('python',["pythonScripts/simplex.py"]);

            await pythonProcess.stdout.on('data', (data) => {
                const strNumbers = data.toString().split(',')
                const numbers = strNumbers.map(string => parseFloat(string))

                const productsInfo = []
                let allPrice = 0
                products.forEach((product, i) => {
                    const productInfo = {
                        name: product.name,
                        value: numbers[i],
                        resultParams: {
                            proteins: 0,
                            njk: 0,
                            carbohydrates: 0
                        },
                        resultPrice: numbers[i] * product.price
                    }
                    Object.keys(productInfo.resultParams).forEach((key) => {
                        productInfo.resultParams[key] += numbers[i] * product.params[key]
                    })
                    productInfo.resultParams['calories'] = 0
                    productInfo.resultParams['calories'] += numbers[i] * product.calories
                    productsInfo.push(productInfo)
                    allPrice += numbers[i] * product.price
                })

                const resultParams = {
                    proteins: 0,
                    njk: 0,
                    carbohydrates: 0
                }

                Object.keys(resultParams).forEach((key) => {
                    products.forEach((product, i) => {
                        resultParams[key] += numbers[i] * product.params[key]
                    })
                })
                resultParams['calories'] = 0
                products.forEach((product, i) => {
                    resultParams['calories'] += product.calories * numbers[i]
                })

                res.status(200).json({ productsInfo, resultParams, allPrice })
            });
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CartController()