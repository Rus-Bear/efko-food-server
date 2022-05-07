const {Schema, model, Types} = require("mongoose")

const Dash = new Schema({
    name: {type: String, unique: true, required: true},
    photoUrl: {type: String},
    recipeUrl: {type: String},
    products: {type: [Types.ObjectId], required: true, ref: 'Product', default: []},
    calories: {type: Number, required: true, default: 0},
    params: {
        proteins: {type: Number, required: true, default: 0},
        njk: {type: Number, required: true, default: 0},
        carbohydrates: {type: Number, required: true, default: 0}
    }
})

module.exports = model('Dash', Dash)
