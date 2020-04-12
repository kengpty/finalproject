var Trucks = require('mongoose').model('trucks');

exports.render = function(req,res){
    Trucks.find({},(err,indexdata)=>{
        let ts = Date.now();

        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        
        // prints date & time in YYYY-MM-DD format
       
   

    // if(typeof req.session.remember !== 'undefined'){
    //     isLoggedIn = req.session.remember;
    // }
    
    // res.render('homepage1',{isLoggedIn:isLoggedIn});
    res.render('homepage1',{
        username: req.user ? req.user.userID : '',indexdata,year,month,date});
    })  
};

exports.renderfail = function(req,res){
    // var isLoggedIn = false;

    // if(typeof req.session.remember !== 'undefined'){
    //     isLoggedIn = req.session.remember;
    // }
    
    // res.render('homepage1',{isLoggedIn:isLoggedIn});
    res.render('homepage1',{
        username: req.user ? req.user.userID : '',loginFail:true});
        
};