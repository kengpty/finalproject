var Transport = require('mongoose').model('transports')
var Admin = require('mongoose').model('admins')

exports.render = function(req,res){
    res.render('adminPage')

}

exports.login = function(req,res){
   
    // Transport.find({'transportType':2}},(err, data2)=>{
    //     Transport.find({$and:[{'transportType':1},{'userID':username}]},(err, data1)=>{
    //         var jsonarraylicense=[]
    //         var jsonarraytype=[]
    //         for(let i=0;i<data2.length;i++){
    //             jsonarraytype[i] = JSON.parse(data2[i].truckType)
    //             jsonarraylicense[i] = JSON.parse(data2[i].licensePlate)
    //         }
            
    //         console.log(jsonarraylicense)
            
    //         if(data2[0]!=undefined){
    //             if(data1[0]!=undefined){
    //                 res.render('checkStatus',{jsonarraytype,jsonarraylicense,data1:data1,data2:data2,singleTruck:true,multiTruck:true})
    //                 }else if(data1[0]==undefined){
    //                     res.render('checkStatus',{jsonarraytype,jsonarraylicense,data2:data2,multiTruck:true})
    //                 }
               
    //             }
            
    //         if(data2[0]==undefined){
    //             if(data1[0]!=undefined){
    //                 res.render('checkStatus',{data1:data1,singleTruck:true})
    //                 }else if(data1[0]==undefined){
    //                     res.render('checkStatus',{nomoreData:true})
    //                 }
    //         }
    //     })
    // })
    // res.render('checkStatus',{username: req.user ? req.user.userID : ''})
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
                    res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',jsonarraytype,jsonarraylicense,data1:data1,data2:data2,singleTruck:true,multiTruck:true})
                    }
                if(data1[0]==undefined){
                    res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',jsonarraytype,jsonarraylicense,data2:data2,multiTruck:true})
                }
               
            }
            
            if(data2[0]==undefined){
                if(data1[0]!=undefined){
                    res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',data1:data1,singleTruck:true})
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