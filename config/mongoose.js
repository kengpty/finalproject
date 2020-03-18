var mongoose = require('mongoose');
var uri = 'mongodb://localhost/project2';

module.exports = function(){
    var db = mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true});
    require('../app/models/user.model');
    require('../app/models/pallet.model');
    require('../app/models/Truck.model');

    return db;
}