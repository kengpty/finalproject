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
            res.redirect('/admin/report?link=0')
        }else res.render('adminPage',{loginFail:true})
   })
    
}

exports.report = function(req,res){
    // console.log(req.query.link)
    var link = req.query.link
    if(link==0){
        // console.log('case1')
        Transport.find({'transportType':2},(err, data2)=>{
            Transport.find({'transportType':1},(err, data1)=>{
                var jsonarraylicense=[]
                var jsonarraytype=[]
                for(let i=0;i<data2.length;i++){
                    jsonarraytype[i] = JSON.parse(data2[i].truckType)
                    jsonarraylicense[i] = JSON.parse(data2[i].licensePlate)
                }
                textHeader='ข้อมูลออเดอร์ทั้งหมด'
                // console.log(jsonarraylicense)
                
                if(data2[0]!=undefined){
                    if(data1[0]!=undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,jsonarraytype,jsonarraylicense,data1:data1,data2:data2,singleTruck:true,multiTruck:true})
                        }
                    if(data1[0]==undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,jsonarraytype,jsonarraylicense,data2:data2,multiTruck:true})
                    }
                
                }
                
                if(data2[0]==undefined){
                    if(data1[0]!=undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,data1:data1,singleTruck:true})
                        }
                    if(data1[0]==undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,nomoreData:true})
                    }
                }
            })
        })
    }

    if(link==1){
        // console.log('case2')
        Transport.find({$and:[{'transportType':2},{'status':'รอการอนุมัติ'}]},(err, data2)=>{
            Transport.find({$and:[{'transportType':1},{'status':'รอการอนุมัติ'}]},(err, data1)=>{
                var jsonarraylicense=[]
                var jsonarraytype=[]
                for(let i=0;i<data2.length;i++){
                    jsonarraytype[i] = JSON.parse(data2[i].truckType)
                    jsonarraylicense[i] = JSON.parse(data2[i].licensePlate)
                }
                textHeader='ข้อมูลออเดอร์ที่รอการอนุมัติ'
                // console.log(jsonarraylicense)
                
                if(data2[0]!=undefined){
                    if(data1[0]!=undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,jsonarraytype,jsonarraylicense,data1:data1,data2:data2,singleTruck:true,multiTruck:true})
                        }
                    if(data1[0]==undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,jsonarraytype,jsonarraylicense,data2:data2,multiTruck:true})
                    }
                
                }
                
                if(data2[0]==undefined){
                    if(data1[0]!=undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,data1:data1,singleTruck:true})
                        }
                    if(data1[0]==undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,nomoreData:true})
                    }
                }
            })
        })
    }

    if(link==2){
        // console.log('case3')
        Transport.find({$and:[{'transportType':2},{'status':'ได้รับการอนุมัติ'}]},(err, data2)=>{
            Transport.find({$and:[{'transportType':1},{'status':'ได้รับการอนุมัติ'}]},(err, data1)=>{
                var jsonarraylicense=[]
                var jsonarraytype=[]
                for(let i=0;i<data2.length;i++){
                    jsonarraytype[i] = JSON.parse(data2[i].truckType)
                    jsonarraylicense[i] = JSON.parse(data2[i].licensePlate)
                }
                textHeader='ข้อมูลออเดอร์ที่ได้รับการอนุมัติ'
                // console.log(jsonarraylicense)
                
                if(data2[0]!=undefined){
                    if(data1[0]!=undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,jsonarraytype,jsonarraylicense,data1:data1,data2:data2,singleTruck:true,multiTruck:true})
                        }
                    if(data1[0]==undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,jsonarraytype,jsonarraylicense,data2:data2,multiTruck:true})
                    }
                
                }
                
                if(data2[0]==undefined){
                    if(data1[0]!=undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,data1:data1,singleTruck:true})
                        }
                    if(data1[0]==undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,nomoreData:true})
                    }
                }
            })
        })
    }

    if(link==3){
        // console.log('case4')
        Transport.find({$and:[{'transportType':2},{'status':'กำลังไปรับของ'}]},(err, data2)=>{
            Transport.find({$and:[{'transportType':1},{'status':'กำลังไปรับของ'}]},(err, data1)=>{
                var jsonarraylicense=[]
                var jsonarraytype=[]
                for(let i=0;i<data2.length;i++){
                    jsonarraytype[i] = JSON.parse(data2[i].truckType)
                    jsonarraylicense[i] = JSON.parse(data2[i].licensePlate)
                }
                textHeader='ข้อมูลออเดอร์ที่กำลังไปรับของ'
                // console.log(jsonarraylicense)
                
                if(data2[0]!=undefined){
                    if(data1[0]!=undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,jsonarraytype,jsonarraylicense,data1:data1,data2:data2,singleTruck:true,multiTruck:true})
                        }
                    if(data1[0]==undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,jsonarraytype,jsonarraylicense,data2:data2,multiTruck:true})
                    }
                
                }
                
                if(data2[0]==undefined){
                    if(data1[0]!=undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,data1:data1,singleTruck:true})
                        }
                    if(data1[0]==undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,nomoreData:true})
                    }
                }
            })
        })
    }

    if(link==4){
        // console.log('case5')
        Transport.find({$and:[{'transportType':2},{'status':'กำลังขนส่ง'}]},(err, data2)=>{
            Transport.find({$and:[{'transportType':1},{'status':'กำลังขนส่ง'}]},(err, data1)=>{
                var jsonarraylicense=[]
                var jsonarraytype=[]
                for(let i=0;i<data2.length;i++){
                    jsonarraytype[i] = JSON.parse(data2[i].truckType)
                    jsonarraylicense[i] = JSON.parse(data2[i].licensePlate)
                }
                textHeader='ข้อมูลออเดอร์ที่กำลังขนส่ง'
                // console.log(jsonarraylicense)
                
                if(data2[0]!=undefined){
                    if(data1[0]!=undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,jsonarraytype,jsonarraylicense,data1:data1,data2:data2,singleTruck:true,multiTruck:true})
                        }
                    if(data1[0]==undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,jsonarraytype,jsonarraylicense,data2:data2,multiTruck:true})
                    }
                
                }
                
                if(data2[0]==undefined){
                    if(data1[0]!=undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,data1:data1,singleTruck:true})
                        }
                    if(data1[0]==undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,nomoreData:true})
                    }
                }
            })
        })
    }
    if(link==5){
        // console.log('case6')
        Transport.find({$and:[{'transportType':2},{'status':'เสร็จสิ้น'}]},(err, data2)=>{
            Transport.find({$and:[{'transportType':1},{'status':'เสร็จสิ้น'}]},(err, data1)=>{
                var jsonarraylicense=[]
                var jsonarraytype=[]
                for(let i=0;i<data2.length;i++){
                    jsonarraytype[i] = JSON.parse(data2[i].truckType)
                    jsonarraylicense[i] = JSON.parse(data2[i].licensePlate)
                }
                textHeader='ข้อมูลออเดอร์ที่เสร็จสิ้น'
                // console.log(jsonarraylicense)
                
                if(data2[0]!=undefined){
                    if(data1[0]!=undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,jsonarraytype,jsonarraylicense,data1:data1,data2:data2,singleTruck:true,multiTruck:true})
                        }
                    if(data1[0]==undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,jsonarraytype,jsonarraylicense,data2:data2,multiTruck:true})
                    }
                
                }
                
                if(data2[0]==undefined){
                    if(data1[0]!=undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,haveData:true,data1:data1,singleTruck:true})
                        }
                    if(data1[0]==undefined){
                        res.render('adminReport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',textHeader,nomoreData:true})
                    }
                }
            })
        })
    }
    
}

    



exports.edit = function(req,res){
    Transport.find({'orderNo':req.query.order},(err,data)=>{
        if(data[0]!=null){
            
            if(data[0].transportType==1){
                console.log('case1')
                if(data[0].status=='รอการอนุมัติ'){
                res.render('adminConfig',{data:data[0],transportType1:true,status1:true})}
                if(data[0].status=='ได้รับการอนุมัติ'){
                res.render('adminConfig',{data:data[0],transportType1:true,status2:true})}
                if(data[0].status=='กำลังไปรับของ'){
                res.render('adminConfig',{data:data[0],transportType1:true,status3:true})}
                if(data[0].status=='กำลังขนส่ง'){
                res.render('adminConfig',{data:data[0],transportType1:true,status4:true})}
                if(data[0].status=='เสร็จสิ้น'){
                res.render('adminConfig',{data:data[0],transportType1:true,status5:true})}
            }  
            if(data[0].transportType==2){
                console.log('case2')
                var jsonarraylicense=[]
                var jsonarraytype=[]
                
                jsonarraytype[0] = JSON.parse(data[0].truckType)
                jsonarraylicense[0] = JSON.parse(data[0].licensePlate)
                // console.log(jsonarraytype[0][0])
                // console.log(jsonarraylicense[0])
                if(data[0].status=='รอการอนุมัติ'){
                res.render('adminConfig',{data:data[0],jsonarraylicense,jsonarraytype,transportType2:true,status1:true})}
                if(data[0].status=='ได้รับการอนุมัติ'){
                res.render('adminConfig',{data:data[0],jsonarraylicense,jsonarraytype,transportType2:true,status2:true})}
                if(data[0].status=='กำลังไปรับของ'){
                res.render('adminConfig',{data:data[0],jsonarraylicense,jsonarraytype,transportType2:true,status3:true})}
                if(data[0].status=='กำลังขนส่ง'){
                res.render('adminConfig',{data:data[0],jsonarraylicense,jsonarraytype,transportType2:true,status4:true})}
                if(data[0].status=='เสร็จสิ้น'){
                res.render('adminConfig',{data:data[0],jsonarraylicense,jsonarraytype,transportType2:true,status5:true})}
            }
           

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

exports.postedit = function(req,res){
    Transport.findOneAndUpdate({'orderNo':req.query.order}, {$set: {"status":req.body.status}}, {upsert: true}, function(err,doc) {
        if (err) { throw err; }
        // else { console.log("Updated"); }
    }); 
    res.redirect('/admin/report?link=0',)
        
}