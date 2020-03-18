exports.render = function(req,res){
    // var isLoggedIn = false;

    // if(typeof req.session.remember !== 'undefined'){
    //     isLoggedIn = req.session.remember;
    // }
    
    // res.render('homepage1',{isLoggedIn:isLoggedIn});
    res.render('homepage1',{
        username: req.user ? req.user.userID : ''});
        
};