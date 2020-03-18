module.exports = function(app){
    var transport = require('../controllers/transport.controller');
    app.route('/transport').get(transport.render).post(transport.getOrder);
};