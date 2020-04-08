
var express = require('express');
var bodyParser = require('body-parser');
var validator = require('express-validator')
// var cookieSession = require('cookie-session');
var session = require('express-session');
var passport = require('passport');

module.exports = function(){
    var app = express();
    
   app.use(session({
       secret:'secret_key',
       resave: false,
       saveUninitialized:true
   }));

    // app.use(cookieSession({
    //     name: 'session',
    //     keys: ['secret_key1','secret_key2']
    // }))

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static('picture'))

    app.set('views','./app/views');
    app.set('view engine','pug');


    require('../app/routes/admin.route')(app);
    require('../app/routes/index.routes')(app);
    require('../app/routes/user.routes')(app);
    require('../app/routes/transport.routes')(app);
    require('../app/routes/status.routes')(app);
    require('../app/routes/contact.route')(app);
    return app;
};