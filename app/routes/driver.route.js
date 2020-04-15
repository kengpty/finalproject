module.exports = function(app){
    var passport = require('passport')
    var driver = require('../controllers/driver.controller');
    // app.get('/admin/report',admin.report)
    app.get('/driver',driver.render)
    app.post('/driver',driver.login)
    app.get('/driver/edit/',driver.edit)
    app.get('/driver/report',driver.report)
    app.post('/driver/find',driver.find)
};