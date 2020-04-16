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
    Transport.findOneAndUpdate({'orderNo':req.query.order}, {$set: {"status":req.body.status}}, {upsert: true}, function(err,doc) {
        if (err) { throw err; }
        // else { console.log("Updated"); }
    }); 
    res.redirect('/driver/report',)
    

}

exports.find = function(req,res){
   
    Transport.find({'orderNo':req.body.orderNo},(err,data)=>{
        if(data[0]!=undefined){
                
            if(data[0].transportType==1){
                res.render('driverReport',{data:data[0],transportType1:true})
            }
            if(data[0].transportType==2){
                var jsonarraylicense=[]
                var jsonarraytype=[]
                
                jsonarraytype[0] = JSON.parse(data[0].truckType)
                jsonarraylicense[0] = JSON.parse(data[0].licensePlate)
                
                res.render('driverReport',{data:data[0],jsonarraylicense,jsonarraytype,transportType2:true})
            }
        }
    
        if(data[0]==undefined){
            res.render('driverReport',{nomoreData:true})
        }
        
    })
    
   
    

}
exports.findget = function(req,res){
    
    Transport.find({'orderNo':req.query.order},(err,data)=>{
        
        if(data[0].transportType==1){
            res.render('driverReport',{data:data[0],transportType1:true})
        }
        if(data[0].transportType==2){
            var jsonarraylicense=[]
            var jsonarraytype=[]
            
            jsonarraytype[0] = JSON.parse(data[0].truckType)
            jsonarraylicense[0] = JSON.parse(data[0].licensePlate)
            
            res.render('driverReport',{data:data[0],jsonarraylicense,jsonarraytype,transportType2:true})
        }
        if(data[0]==undefined){
            res.render('driverReport',{nomoreData:true})
        }
    })
    
   
    

}
exports.allOrder = function(req,res){
   
    Transport.find({$and:[{'transportType':2},{'status':'ได้รับการอนุมัติ'}]},(err, data2)=>{
        Transport.find({$and:[{'transportType':1},{'status':'ได้รับการอนุมัติ'}]},(err, data1)=>{
            var jsonarraylicense=[]
            var jsonarraytype=[]
            for(let i=0;i<data2.length;i++){
                jsonarraytype[i] = JSON.parse(data2[i].truckType)
                jsonarraylicense[i] = JSON.parse(data2[i].licensePlate)
            }
            
            // console.log(jsonarraylicense)
            
            if(data2[0]!=undefined){
                if(data1[0]!=undefined){
                    res.render('driverReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',haveData:true,jsonarraytype,jsonarraylicense,data1:data1,data2:data2,singleTruck:true,multiTruck:true})
                    }
                if(data1[0]==undefined){
                    res.render('driverReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',haveData:true,jsonarraytype,jsonarraylicense,data2:data2,multiTruck:true})
                }
            
            }
            
            if(data2[0]==undefined){
                if(data1[0]!=undefined){
                    res.render('driverReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',haveData:true,data1:data1,singleTruck:true})
                    }
                if(data1[0]==undefined){
                    res.render('driverReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',nomoreData:true})
                }
            }
        })
    })
        
   
    
   
    

}


exports.pickup = function(req,res){
    Transport.find({$and:[{'transportType':2},{'status':'กำลังไปรับของ'}]},(err, data2)=>{
        Transport.find({$and:[{'transportType':1},{'status':'กำลังไปรับของ'}]},(err, data1)=>{
            var jsonarraylicense=[]
            var jsonarraytype=[]
            for(let i=0;i<data2.length;i++){
                jsonarraytype[i] = JSON.parse(data2[i].truckType)
                jsonarraylicense[i] = JSON.parse(data2[i].licensePlate)
            }
            
            // console.log(jsonarraylicense)
            textHeader='ข้อมูลออเดอร์กำลังไปรับของ'
            if(data2[0]!=undefined){
                if(data1[0]!=undefined){
                    res.render('driverReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,jsonarraytype,jsonarraylicense,data1:data1,data2:data2,singleTruck:true,multiTruck:true})
                    }
                if(data1[0]==undefined){
                    res.render('driverReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,jsonarraytype,jsonarraylicense,data2:data2,multiTruck:true})
                }
            
            }
            
            if(data2[0]==undefined){
                if(data1[0]!=undefined){
                    res.render('driverReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,data1:data1,singleTruck:true})
                    }
                if(data1[0]==undefined){
                    res.render('driverReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,nomoreData:true})
                }
            }
        })
    })
        
   
   
}


exports.transport = function(req,res){
    Transport.find({$and:[{'transportType':2},{'status':'กำลังขนส่ง'}]},(err, data2)=>{
        Transport.find({$and:[{'transportType':1},{'status':'กำลังขนส่ง'}]},(err, data1)=>{
            var jsonarraylicense=[]
            var jsonarraytype=[]
            for(let i=0;i<data2.length;i++){
                jsonarraytype[i] = JSON.parse(data2[i].truckType)
                jsonarraylicense[i] = JSON.parse(data2[i].licensePlate)
            }
            
            // console.log(jsonarraylicense)
            
            if(data2[0]!=undefined){
                if(data1[0]!=undefined){
                    res.render('driverReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',haveData:true,jsonarraytype,jsonarraylicense,data1:data1,data2:data2,singleTruck:true,multiTruck:true})
                    }
                if(data1[0]==undefined){
                    res.render('driverReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',haveData:true,jsonarraytype,jsonarraylicense,data2:data2,multiTruck:true})
                }
            
            }
            
            if(data2[0]==undefined){
                if(data1[0]!=undefined){
                    res.render('driverReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',haveData:true,data1:data1,singleTruck:true})
                    }
                if(data1[0]==undefined){
                    res.render('driverReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',nomoreData:true})
                }
            }
        })
    })
        

}


