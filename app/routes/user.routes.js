module.exports = function(app){
    var user = require('../controllers/user.controller');
    var passport = require('passport')
    // app.post('/login',user.login);
    app.route('/login').post(passport.authenticate('local',{
        failureRedirect: '/indexFail',
        successRedirect: '/',
    }));
    // app.post('/login',passport.authenticate('local',{
    //     successRedirect: '/',
    //     failureRedirect: '/user'}));
    app.post('/logout',user.logout);
    app.post('/signup',user.signup);
    app.route('/user').post(user.create).get(user.list);
    app.route('/user/:username').get(user.read);
    app.param('username',user.userByUsername)
    app.get('/cancel/',user.cancel)
};


