const fs = require('fs')

class TestController {
    async simplexTest(req, res, next) {
       try {

       } catch (e) {
           next(e)
       }
    }
}

module.exports = new TestController()