const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PalletSchema = new Schema({
    palletName: {type: String,unique:true},
    width: {type:Number },
    length:{type:Number},
    length:{type:Number},
    length:{type:Number}
})


mongoose.model('pallets',PalletSchema);  