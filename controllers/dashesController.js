const dashesService = require('../services/dashesService')

class DashesController {
    async addDash(req, res, next) {
        try {
            const dashData = req.body

            const dash = await dashesService.addDash(dashData)

            res.status(200).json(dash)
        } catch (e) {
            next(e)
        }
    }

    async getAllDashes(req, res, next) {
        try {
            const dashes = await dashesService.getAllDashes()

            res.status(200).json(dashes)
        } catch (e) {
            next(e)
        }
    }

    async getDashById(req, res, next) {
        try {
            const id = req.param('id')

            const dash = await dashesService.getDashById(id)

            res.status(200).json(dash)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new DashesController()