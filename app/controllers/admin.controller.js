var Transport = require('mongoose').model('transports')
var Admin = require('mongoose').model('admins')

exports.render = function(req,res){
    res.render('adminPage')

}

exports.login = function(req,res){
   
    Admin.find({$and:[{'ID':req.body.ID},{'password':req.body.Password}]},(err, data)=>{
      
        if(data[0]!=null){
            Transport.find({'transportType':2},(err, data2)=>{
                Transport.find({'transportType':1},(err, data)=>{
            
                var testdata={}
                    for(let i=0;i<=5;i++){
                        var obj = JSON.parse(data2[i].licensePlate)
                        testdata[i]=obj
                        if(data2[i+1]==undefined){
                            break
                        }
                    }
                   
            
            res.render('adminReport',{data:data,data2json:testdata,data2:data2});
                })
            })
        
    }else {res.render('adminPage',{loginFail:true})}
    
    })
  

    

}

exports.edit = function(req,res){
    Transport.find({'orderNo':req.query.order},(err,data)=>{
        if(data[0]!=null){
            res.render('adminConfig',{data:data[0]})
        }else console.log('fail')
    })
    

}