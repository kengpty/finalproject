var Transport = require('mongoose').model('transports')
var driver = require('mongoose').model('drivers')

exports.render = function(req,res){
    res.render('driverPage')

}

exports.login = function(req,res){
   
    driver.find({$and:[{'ID':req.body.ID},{'password':req.body.Password}]},(err,data)=>{
        if(data[0]!=undefined){
            res.redirect('/driver/report')
        }else res.render('driverPage',{loginFail:true})
   })
}


exports.report = function(req,res){
    
    res.render('driverReport')
      
    

}   



exports.edit = function(req,res){
    Transport.find({'orderNo':req.query.order},(err,data)=>{
        if(data[0]!=null){
            res.render('adminConfig',{data:data[0]})
        }else console.log('fail')
    })
    

}

exports.find = function(req,res){
   
    Transport.find({$and:[{'orderNo':req.body.orderNo},{'status':'ได้รับการอนุมัติ'}]},(err,data)=>{
        if(data[0].transportType==1){
            res.render('driverReport',{data:data[0],haveData:true,transportType1:true})
        }
        // if(data[0].){
        //     res.render('driverReport',{data:data[0],})
        // }else console.log('fail')
        
    })
    
   
    

}



