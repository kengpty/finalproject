var User = require('mongoose').model('users');
var status = require('./status.controller');
var Transport = require('mongoose').model('transports')
var Trucks = require('mongoose').model('trucks');

exports.logout = function(req,res){
    req.logout();
    res.redirect('/');
};


exports.create = function(req,res,next){
    var user = new User({
    userID:req.body.userID,
    password:req.body.password1,
    fullname:req.body.fullname,
    email:req.body.email,
    tel:req.body.tel,
    priority:1,
    companyName:req.body.companyName
    });
    user.save(function(err){
        if(err){
            // return next(err);
            res.render('homepage1',{registerFail:true});
        }else{
            res.render('homepage1',{isLoggedIn:true});
        }
    });
};
exports.list = function(req,res,next){
    User.find({},function(err,users){
        if(err){
            return next(err);
        }else{
            res.json(users);
        }
    });
 };



exports.read = function(req,res){
   res.json(req.user);
};
exports.userByUsername = function(req,res,next,username){
     User.findOne({
         userID:username
     },function(err,user){
         if(err){
             return next(err);
         }else{
             req.user = user;
             next();
         }
     })
};
 
exports.signup = function(req,res,next){
    if(!req.user){
        var user = new User(req.body);
        user.provide = 'local';
        user.save(function(err){
            console.log(user);
            if(err) console.log(err);
            //res.redirect('homepage1',{registerFail:true});
            req.login(user,function(err){
                if(err) return next(err);
                return res.redirect('/');
            })
        })
    
    }else{
        return res.redirect('/');
    }
    // console.log(req.user);
};



