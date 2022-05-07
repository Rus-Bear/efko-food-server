const Dash = require('../models/Dash')

class DashesService {
    async addDash(dashData) {
        return await Dash.create(dashData)
    }

    async getAllDashes() {
        return await Dash.find().populate('products')
    }

    async getDashById(id) {
        return await Dash.findById(id).populate('products')
    }
}

module.exports = new DashesService()