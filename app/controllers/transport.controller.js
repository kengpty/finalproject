var Transport = require('mongoose').model('transports')
var Trucks = require('mongoose').model('trucks');
var order =require('mongoose').model('order')

exports.render = function(req,res){
   
    res.render('transport',{
        username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',tel: req.user ? req.user.tel : ''});
        
};

// var Pallet = require('mongoose').model('pallets');
exports.getOrder= function(req,res){
    
    //maxPalletfortruck
    var maxPallet = 12
    var minPallet = 8
    // var palletName=req.body.palletSize
    console.log("PalletSize = "+req.body.palletSize)
   
    var Qty = parseInt(req.body.Qty)
    console.log('this is Qty = '+Qty)
    
    
    if(Qty<=8){
        console.log('CASE1')
        order.findOne({},(err,orderdata)=>{
            
            
            Trucks.find({$and:[{'pallet':{$lte:maxPallet}},{'status':'ready'}]},(err, data)=>{
                //save
                if(data[0]!=null){
                    var transports = new Transport({
                        transportType:1,
                        orderNo:orderdata.orderNo,
                        userID:req.body.userID,
                        fullname: req.body.username,
                        palletsize:req.body.palletSize,
                        qty:Qty,
                        tel:req.body.tel,
                        licensePlate:data[0].licensePlate,
                        truckType:data[0].type,
                        address1:req.body.address1,
                        address2:req.body.address2
                    })
                    transports.save(function(err){
                        if(err){
                            console.log(err)
                        }else{
                            //อัพเดทสถานะของรถเมื่อได้เซฟลงdatabaseในส่วนTransportแล้ว
                            Trucks.findOneAndUpdate({"licensePlate":data[0].licensePlate}, {$set: {"status":"unready"}}, {upsert: true}, function(err,doc) {
                                if (err) { throw err; }
                                else { console.log("Updated"); }
                            }); 
                            order.findOneAndUpdate({"orderNo":orderdata.orderNo}, {$set: {"orderNo":orderdata.orderNo+1}}, {upsert: true}, function(err,doc) {
                                if (err) { throw err; }
                                else { console.log("Updated"); }
                            }); 
                            
                            res.render('homepage1',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',transpotsuccess:true})
                        }
                    })
                }
                // กรณีไม่มีรถว่างเลย
                if(data[0]==undefined){
                    res.render('transport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',tel: req.user ? req.user.tel : '',truckNotAvailable:true})
                }   
            }) 
        })
       
    } 
    if(Qty>=9 && Qty<=12){
        console.log('CASE2')
        order.findOne({},(err,orderdata)=>{
            Trucks.find({$and:[{'pallet':{$gte:maxPallet}},{'status':'ready'}]},(err, data)=>{
                //ยังทำไม่เสร็จ !!!!!!!!! รอทำ save
                
                if(data[0]!=null){
                    var transports = new Transport({
                        transportType:1,
                        orderNo:orderdata.orderNo,
                        userID:req.body.userID,
                        fullname: req.body.username,
                        palletsize:req.body.palletSize,
                        qty:Qty,
                        tel:req.body.tel,
                        licensePlate:data[0].licensePlate,
                        truckType:data[0].type,
                        address1:req.body.address1,
                        address2:req.body.address2
                    })
                    transports.save(function(err){
                        if(err){
                            console.log(err)
                        }else{
                            //อัพเดทสถานะของรถเมื่อได้เซฟลงdatabaseในส่วนTransportแล้ว
                            Trucks.findOneAndUpdate({"licensePlate":data[0].licensePlate}, {$set: {"status":"unready"}}, {upsert: true}, function(err,doc) {
                                if (err) { throw err; }
                                else { console.log("TransportUpdated"); }
                            }); 
                            order.findOneAndUpdate({"orderNo":orderdata.orderNo}, {$set: {"orderNo":orderdata.orderNo+1}}, {upsert: true}, function(err,doc) {
                                if (err) { throw err; }
                                else { console.log("orderNoUpdated"); }
                            }); 
                            
                            res.render('homepage1',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',transpotsuccess:true})
                        }
                    })
                }
                // กรณีรถใหญ่เต็ม
                if(data[0]==undefined){
                    Trucks.find({$and:[{'pallet':{$lte:minPallet}},{'status':'ready'}]},(err, data)=>{
                        var AlldataLicensePlate=[]
                        var AlldataTruckType=[]
                        var countQTY=0
                        var count =0
                        //truckForUse เก็บข้อมูลรถคันเล็กที่ใช้
                        // console.log(data)
                        var truckForUse=[]
                        
                        if(data[0]!=null){
                            for(let i=0;countQTY<=Qty;i++){
                                if(data[i]==undefined){
                                    return  res.render('transport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',tel: req.user ? req.user.tel : '',truckNotAvailable:true})
                                }
                                truckForUse.push({licensePlate:data[i].licensePlate,type:data[i].type})  
                                // truckTypeForUse.push({type:data[i].type}) 
                                // truckForUse[i]=data[i],
                                
                                countQTY+=data[i].pallet
                                count++
                               
                            }
                            for(let dataLicensePlate=0;dataLicensePlate<truckForUse.length;dataLicensePlate++){
                                AlldataLicensePlate[dataLicensePlate]=truckForUse[dataLicensePlate][0]
                                AlldataTruckType[dataLicensePlate]=truckForUse[dataLicensePlate][1]
                            }
                            // console.log(AlldataLicensePlate)
                            var jsonDataLicensePlate = JSON.stringify(AlldataLicensePlate)
                            var jsonDataTruckType = JSON.stringify(AlldataTruckType)
                            // var json = JSON.parse(truckForUse)
                            var json = JSON.stringify(truckForUse)
                            // var a=JSON.parse(json.licensePlate)
                            var transports = new Transport({
                                transportType:2,
                                orderNo:orderdata.orderNo,
                                userID:req.body.userID,
                                fullname: req.body.username,
                                palletsize:req.body.palletSize,
                                qty:Qty,
                                tel:req.body.tel,licensePlate:jsonDataLicensePlate,
                                truckType:jsonDataTruckType,
                                address1:req.body.address1,
                                address2:req.body.address2
                            })
                            transports.save(function(err){
                                if(err){
                                    console.log(err)
                                }else{
                                    for(let i=0;i<count;i++){
                                        Trucks.findOneAndUpdate({"licensePlate":data[i].licensePlate}, {$set: {"status":"unready"}}, {upsert: true}, function(err,doc) {
                                            if (err) { throw err; }
                                            else { console.log("TransportUpdated"); }
                                        }); 
                                    }
                                    order.findOneAndUpdate({"orderNo":orderdata.orderNo}, {$set: {"orderNo":orderdata.orderNo+1}}, {upsert: true}, function(err,doc) {
                                        if (err) { throw err; }
                                        else { console.log("orderNoUpdated"); }
                                    }); 
                                    res.render('homepage1',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',transpotsuccess:true})
                                }
                            })
                            
                        }
                        if(data[0]==undefined){
                            res.render('transport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',tel: req.user ? req.user.tel : '',truckNotAvailable:true})
                       
    
                        }  
                  
                       
                        
                    })
                }
            })
        })
    }
    if(Qty>12){
       
        order.findOne({},(err,orderdata)=>{
            Trucks.find({$and:[{'pallet':{$lte:maxPallet}},{'status':'ready'}]},(err, data)=>{
                var AlldataLicensePlate=[]
                var AlldataTruckType=[]
                var countQTY=0
                var count =0
                var truckForUse=[]
                if(data[0]!=null){
                    for(let i=0;countQTY<=Qty;i++){
                        if(data[i]==undefined){
                            return  res.render('transport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',tel: req.user ? req.user.tel : '',truckNotAvailable:true})
                        }
                        // truckForUse.push({licensePlate:data[i].licensePlate,type:data[i].type})  
                        // truckTypeForUse.push({type:data[i].type}) 
                        truckForUse[i]=[data[i].licensePlate,data[i].type]
                        
                        countQTY+=data[i].pallet
                        count++
                       
                    }
                    // var json = JSON.stringify(truckForUse)
                   
                    for(let dataLicensePlate=0;dataLicensePlate<truckForUse.length;dataLicensePlate++){
                        AlldataLicensePlate[dataLicensePlate]=truckForUse[dataLicensePlate][0]
                        AlldataTruckType[dataLicensePlate]=truckForUse[dataLicensePlate][1]
                    }
                    // console.log(AlldataLicensePlate)
                    var jsonDataLicensePlate = JSON.stringify(AlldataLicensePlate)
                    var jsonDataTruckType = JSON.stringify(AlldataTruckType)
                    var transports = new Transport({
                        transportType:2,
                        orderNo:orderdata.orderNo,
                        userID:req.body.userID,
                        fullname: req.body.username,
                        palletsize:req.body.palletSize,
                        qty:Qty,
                        tel:req.body.tel,
                        licensePlate:jsonDataLicensePlate,
                        truckType:jsonDataTruckType,
                        address1:req.body.address1,
                        address2:req.body.address2
                    })
                    transports.save(function(err){
                        if(err){
                            console.log(err)
                        }else{
                            for(let i=0;i<count;i++){
                                Trucks.findOneAndUpdate({"licensePlate":data[i].licensePlate}, {$set: {"status":"unready"}}, {upsert: true}, function(err,doc) {
                                    if (err) { throw err; }
                                    else { console.log("TransportUpdated"); }
                                }); 
                            }
                            order.findOneAndUpdate({"orderNo":orderdata.orderNo}, {$set: {"orderNo":orderdata.orderNo+1}}, {upsert: true}, function(err,doc) {
                                if (err) { throw err; }
                                else { console.log("orderNoUpdated"); }
                            }); 
                            res.render('homepage1',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',transpotsuccess:true})
                        }
                    })
                    
                }
                if(data[0]==undefined){
                    res.render('transport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',tel: req.user ? req.user.tel : '',truckNotAvailable:true})
                }
                
            })



        })
                
               
        }
       
        
        
        
};

    
    // if(req.body.palletSize==='small'){
    //     if(req.body.Qty){}
    // }
// console.log(req.body);
