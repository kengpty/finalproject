module.exports = function(app){
    var admin = require('../controllers/admin.controller');
    // app.get('/admin/report',admin.report)
    app.get('/admin',admin.render)
    app.post('/admin',admin.login)
    app.get('/admin/report/',admin.report)
    // app.post('/admin/login',admin.login)
    app.get('/admin/edit/',admin.edit)
    app.post('/admin/edit/',admin.postedit)
    app.get('/admin/del/',admin.del)
};