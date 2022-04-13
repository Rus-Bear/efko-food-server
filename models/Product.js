const {Schema, model} = require("mongoose")

const Product = new Schema({
    name: {type: String, unique: true, required: true},
    category: {type: String, required: true}, // if not category === "all"
    price: {type: Number, required: true},
    calories: {type: Number, required: true, default: 0},
    params: {
        proteins: {type: Number, required: true, default: 0},
        njk: {type: Number, required: true, default: 0},
        carbohydrates: {type: Number, required: true, default: 0}
    }
})

module.exports = model('Product', Product)
