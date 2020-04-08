const mongoose = require('mongoose');
var Schema = mongoose.Schema;
// transportType 1 defaltcase 2special case
var TransportSchema = new Schema({
    transportType:{type:Number},
    orderNo:{type:Number},
    fullname: {type: String},
    userID: {type: String, lowercase: true},
    time : { type : Date, default: Date.now },
    palletsize:{type:String},
    qty:{type:Number},
    tel:{type:String},
    licensePlate:{type:Object},
    truckType:{type:String},
    address1:{type:String},
    address2:{type:String},
    status:{type:String, default:"รอการอนุมัติ"}
});


mongoose.model('transports',TransportSchema);