

exports.render = function(req,res){
   
    res.render('transport',{
        username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : ''});
        
};

var Trucks = require('mongoose').model('trucks');
var Pallet = require('mongoose').model('pallets');
exports.getOrder= function(req,res){
    //maxPalletfortruck
    var maxPallet = 12
    var minPallet = 8
    // var palletName=req.body.palletSize
    console.log("PalletSize = "+req.body.palletSize)
    Pallet.find({'palletName': req.body.palletSize},(err, data) => {
        var Qty = parseInt(req.body.Qty)
        
        console.log('this is Qty = '+Qty)
        // length_pallet*=Qty
        // console.log(Qty)
        // console.log(length_pallet)
        // console.log(width_pallet)
        // Trucks.find({$and:[{'length':{$gte:length_pallet} },{'status':'ready'}]},(err, data) => {
            // Trucks.find({containPallet},(err, data) => {
            //     console.log(data[0])
            //     if(data[0]==undefined){ res.render('transport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',truckNotAvailable:true})}
            // })
    
        
        
        //normal case QTY<=12
        if(Qty<=maxPallet)
            Trucks.findOneAndUpdate({$and:[{'@pallet':{$gte:Qty}},{'status':'ready'}]},{$set:{'status':'unready'}},(err, data)=>{
                let inHandPallet=Qty
                console.log(data)
                console.log(inHandPallet)
            })
        //case QTY>12
        roundQty = Math.ceil(Qty/12)
        console.log('roundQty ='+roundQty)
         
        // for(let i=1;i<=roundQty;i++){
            
        //     Trucks.find({$and:[{'@pallet':{$gte:12}},{'status':'ready'}]},(err, data)=>{
        //     if(data[i-1]==undefined){
                
                
        //         console.log(data[i-1])
        //         res.render('transport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',truckNotAvailable:true})
        //     }else{
        //         console.log(data[i-1])
        //     }
            
            
        //     })
        
        // }
        
        // if(exit==1){
            
        //     res.render('transport',{username: req.user ? req.user.fullname : '',userID: req.user ? req.user.userID : '',truckNotAvailable:true})
             
        // }    
        


       
       
        if(req.body.palletSize =='Euro_Pallet'){
            var num = req.body.Qty
            if(num<=8){
                Trucks.find({$and:[{'euroPallet':{$gte:num}},{'status':'ready'}]},(err, data) => {
                // console.log(data[0].licensePlate)
                // console.log('euroPallet = '+data[0].euroPallet)
            })
            }
        }
       
        for(j=0;j<data.length;j++){
            Trucks.find({},(err,data)=>{
                if(data[j].width){}
            })
        }
    })
    
};

    
    // if(req.body.palletSize==='small'){
    //     if(req.body.Qty){}
    // }
// console.log(req.body);
