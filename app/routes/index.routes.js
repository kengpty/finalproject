module.exports = function(app){
    var index = require('../controllers/index.controller');
    app.get('/indexFail',index.renderfail)
    app.get('/',index.render)
    //app.route('/').get(index.render).post(index.other)
};