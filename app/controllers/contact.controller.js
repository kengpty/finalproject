exports.showContact = function(req,res){

    res.render('contact',{
        username: req.user ? req.user.userID : ''});
}