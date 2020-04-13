var Transport = require('mongoose').model('transports')
var Admin = require('mongoose').model('admins')
var Trucks = require('mongoose').model('trucks');
exports.render = function(req,res){
    res.render('adminPage')

}

exports.login = function(req,res){
    console.log(req.body)
   Admin.find({$and:[{'ID':req.body.ID},{'password':req.body.Password}]},(err,data)=>{
        if(data[0]!=undefined){
            res.redirect('/admin/report')
        }else res.render('adminPage',{loginFail:true})
   })
    
}

exports.report = function(req,res){
    Transport.find({'transportType':2},(err, data2)=>{
        Transport.find({'transportType':1},(err, data1)=>{
            var jsonarraylicense=[]
            var jsonarraytype=[]
            for(let i=0;i<data2.length;i++){
                jsonarraytype[i] = JSON.parse(data2[i].truckType)
                jsonarraylicense[i] = JSON.parse(data2[i].licensePlate)
            }
            
            console.log(jsonarraylicense)
            
            if(data2[0]!=undefined){
                if(data1[0]!=undefined){
                    res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',haveData:true,jsonarraytype,jsonarraylicense,data1:data1,data2:data2,singleTruck:true,multiTruck:true})
                    }
                if(data1[0]==undefined){
                    res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',haveData:true,jsonarraytype,jsonarraylicense,data2:data2,multiTruck:true})
                }
               
            }
            
            if(data2[0]==undefined){
                if(data1[0]!=undefined){
                    res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',haveData:true,data1:data1,singleTruck:true})
                    }
                if(data1[0]==undefined){
                    res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',nomoreData:true})
                }
            }
        })
    })
    
}

    



exports.edit = function(req,res){
    Transport.find({'orderNo':req.query.order},(err,data)=>{
        if(data[0]!=null){
            res.render('adminConfig',{data:data[0]})
        }else console.log('fail')
    })
    

}



exports.del = function(req,res){
    Transport.findOne({'orderNo':req.query.order},(err,data)=>{
        if(data.transportType==1){
            // console.log(data.licensePlate)
            Trucks.findOneAndUpdate({"licensePlate":data.licensePlate}, {$set: {"status":"ready"}}, {upsert: true}, function(err,doc) {
                if (err) { throw err; }
                // else { console.log("Updated"); }
            }); 
            Transport.findOneAndDelete({'orderNo':req.query.order},(err,data)=>{
                if (err) { throw err; }
                // else { console.log("deleted"); }
            })
            res.redirect('/admin/report',)
        }
        // console.log(data)
        // Trucks.findOneAndUpdate({}) 
        if(data.transportType==2){
            var objTruck = JSON.parse(data.licensePlate)
            console.log(objTruck.length)
            for(let i=0;i<objTruck.length;i++){
                // console.log(objTruck[i])
                Trucks.findOneAndUpdate({"licensePlate":objTruck[i]}, {$set: {"status":"ready"}}, {upsert: true}, function(err,doc) {
                    if (err) { throw err; }
                    // else { console.log("Updated"); }
                }); 
            }
            Transport.findOneAndDelete({'orderNo':req.query.order},(err,data)=>{
                if (err) { throw err; }
                // else { console.log("deleted"); }
            })
            res.redirect('/admin/report',)
          
        }
    })
    
    

}