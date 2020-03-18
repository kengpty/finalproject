const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransportSchema = new Schema({
    palletName: {type: String,unique:true},
    width: {type:Number },
    length:{type:Number},
    length:{type:Number},
    length:{type:Number}
})


mongoose.model('transports',TransportSchema);