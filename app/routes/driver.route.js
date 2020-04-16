module.exports = function(app){
    var passport = require('passport')
    var driver = require('../controllers/driver.controller');
    // app.get('/admin/report',admin.report)
    app.get('/driver',driver.render)
    app.post('/driver',driver.login)
    app.post('/driver/edit/',driver.edit)
    app.get('/driver/report',driver.report)
    app.get('/driver/all',driver.allOrder)
    app.post('/driver/find',driver.find)
    app.get('/driver/find/',driver.findget)
    app.get('/driver/pickup',driver.pickup)
    app.get('/driver/transport',driver.transport)
};