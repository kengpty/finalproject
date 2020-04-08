module.exports = function(app){
    var contact = require('../controllers/contact.controller');
    app.get('/contact',contact.showContact)
    
};