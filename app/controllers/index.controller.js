var Trucks = require('mongoose').model('trucks');

exports.render = function(req,res){
    Trucks.find({},(err,indexdata)=>{
        let ts = Date.now();

        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        
        // prints date & time in YYYY-MM-DD format
       
   

   
    res.render('homepage1',{
        username: req.user ? req.user.userID : '',indexdata,year,month,date});
    })  
};

exports.renderfail = function(req,res){
    Trucks.find({},(err,indexdata)=>{
        let ts = Date.now();

        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        
    res.render('homepage1',{
        username: req.user ? req.user.userID : '',indexdata,year,month,date,loginFail:true});
    })
};