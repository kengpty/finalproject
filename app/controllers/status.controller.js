var Transport = require('mongoose').model('transports')
var Trucks = require('mongoose').model('trucks');
exports.checkStatus = function(req,res){
    var username = req.user ? req.user.userID : '';
     //ดึงดาต้าเบสแบบarrayมาเป็นjson
    
    Transport.find({$and:[{'transportType':2},{'userID':username}]},(err, data2)=>{
        Transport.find({$and:[{'transportType':1},{'userID':username}]},(err, data1)=>{
            var jsonarraylicense=[]
            var jsonarraytype=[]
            for(let i=0;i<data2.length;i++){
                jsonarraytype[i] = JSON.parse(data2[i].truckType)
                jsonarraylicense[i] = JSON.parse(data2[i].licensePlate)
            }
            
            console.log(jsonarraylicense)
            
            if(data2[0]!=undefined){
                if(data1[0]!=undefined){
                    res.render('checkStatus',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',jsonarraytype,jsonarraylicense,data1:data1,data2:data2,singleTruck:true,multiTruck:true})
                    }else if(data1[0]==undefined){
                        res.render('checkStatus',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',data2:data2,multiTruck:true})
                    }
               
                }
            
            if(data2[0]==undefined){
                if(data1[0]!=undefined){
                    res.render('checkStatus',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',data1:data1,singleTruck:true})
                    }else if(data1[0]==undefined){
                        res.render('checkStatus',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',nomoreData:true})
                    }
            }
        })
    })
    // res.render('checkStatus',{username: req.user ? req.user.userID : ''})
   
}


exports.cancel = function(req,res){
    // console.log(req.query)
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
            res.redirect('/checkStatus',)
        }
        // console.log(data)
        // Trucks.findOneAndUpdate({}) 
        if(data.transportType==2){
            // var testdata={}
            // for(let i=0;i<=10;i++){
            //     var obj = JSON.parse(data[i].licensePlate)
            //     testdata[i]=obj
            //     if(data2[i+1]==undefined){
            //         break
            //     }
            // }    
            var obj = JSON.parse(data.licensePlate)
            console.log(obj)
            // Trucks.findOneAndUpdate({"licensePlate":data.licensePlate}, {$set: {"status":"ready"}}, {upsert: true}, function(err,doc) {
            //     if (err) { throw err; }
            //     else { console.log("Updated"); }
            // }); 
            // Transport.findOneAndDelete({'orderNo':req.query.order},(err,data)=>{
            //     if (err) { throw err; }
            //     else { console.log("deleted"); }
            // })
            // res.redirect('/checkStatus',)
        }
    })
    
    
};