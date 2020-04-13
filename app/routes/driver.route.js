module.exports = function(app){
    var passport = require('passport')
    var driver = require('../controllers/driver.controller');
    // app.get('/admin/report',admin.report)
    app.get('/driver',driver.render)
    app.post('/driver/login',driver.login)
    app.get('/driver/edit/',driver.edit)
  
};