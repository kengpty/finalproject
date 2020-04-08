var Transport = require('mongoose').model('transports')
var Trucks = require('mongoose').model('trucks');
exports.checkStatus = function(req,res){
    var username = req.user ? req.user.userID : '';
     //ดึงดาต้าเบสแบบarrayมาเป็นjson
    
    // Transport.find({'userID':username},(err, data)=>{
    //     for(let i=0;i<=8;i++){
    //         // console.log(data[i].licensePlate)
    //         let a =data[i].licensePlate.toString('utf8')
    //         var obj = JSON.parse(a)
    //         // console.log(obj)
    //         data[i].licensePlate===obj
    //         console.log(data[i].licensePlate)
    //     }
    // })
    Transport.find({$and:[{'transportType':2},{'userID':username}]},(err, data2)=>{
        Transport.find({$and:[{'transportType':1},{'userID':username}]},(err, data1)=>{
        // Transport.find({$and:[{'orderNo':15},{'userID':username}]},(err, data)=>{
            // console.log(data)
            // console.log(data2[0].licensePlate)
            var testdata={}
            for(let i=0;i<=5;i++){
                var obj = JSON.parse(data2[i].licensePlate)
                testdata[i]=obj
                if(data2[i+1]==undefined){
                    break
                }
            }
           
            console.log(testdata)
            // console.log(data[0].licensePlate.length)
            //ยังทำไม่เสร็จ !!!!!!!!! รอทำ save
        
            // Transport.find({$and:[{'orderNo':15},{'userID':username}]},(err, data)=>{
            //     console.log(data[0].licensePlate)
            //     var obj = JSON.parse(data[0]. licensePlate)
            //     console.log(obj[0].licensePlate)
            // })
            console.log(data2)
            // for(let i=0;i<=1;i++){
            //     var a = data[i].licensePlate.length
            //     if(a>10){
            //     console.log('test')
            //     }
            //     if(data[i+1]!=null){
            //         console.log('test')
            //         break
            //     }
            // }
            // console.log(obj[8].licensePlate)
            res.render('checkStatus',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',data1:data1,data2json:testdata,data2:data2})
        })
    })
    // res.render('checkStatus',{username: req.user ? req.user.userID : ''})
   
}