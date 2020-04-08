const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TruckSchema = new Schema({
    licensePlate : {type: String,unique:true},
    type : {type: String},
    wheels : {type: Number},
    length : {type: Number},
    height : {type: Number},
    width : {type: Number},
    maximumPayload : {type: Number},
    status : {type: String},
    pallet : {type: Number}
   
})

mongoose.model('trucks',TruckSchema);  
