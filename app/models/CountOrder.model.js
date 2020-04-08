const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countSchema = new Schema({
    orderNo: {type: Number,unique:true},
    orderType:{type: String}
})


mongoose.model('order',countSchema);