const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
    userID: {type: String, lowercase: true,unique:true,trim: true,required:true},
    password: {type: String},
    salt:{type:String},
    fullname: {type: String},
    email: {type: String, lowercase: true, trim: true}, 
    tel: {type: String},
    companyName: {type: String},
    created:{
        type: Date,
        default: Date.now
    },
    provide:{type:String,required:'Provider is required'},
    provideID:String
})
UserSchema.pre('save',function(next){
    if(this.password){
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});
UserSchema.methods.hashPassword = function(password){
    return crypto.pbkdf2Sync(password,this.salt,10000,64,'sha1').toString('base64');
};
UserSchema.methods.authenticate = function(password){
    return this.password === this.hashPassword(password);
};


mongoose.model('users',UserSchema);  