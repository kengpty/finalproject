module.exports = function(app){
    var passport = require('passport')
    var admin = require('../controllers/admin.controller');
    // app.get('/admin/report',admin.report)
    app.get('/admin',admin.render)
    app.post('/admin/login',admin.login)
    app.get('/admin/edit/',admin.edit)
    app.get('/admin/del/',admin.del)
};