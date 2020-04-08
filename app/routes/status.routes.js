module.exports = function(app){
    var status = require('../controllers/status.controller');
    app.get('/checkStatus',status.checkStatus)
   
   
};