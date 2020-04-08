const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AdminSchema = new Schema({
    ID: {type: String, lowercase: true,unique:true,trim: true,required:true},
    password: {type: String},
    salt:{type:String},
    provide:{type:String,required:'Provider is required'},
    provideID:String
})


mongoose.model('admins',AdminSchema);  