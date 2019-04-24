var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require('../models/users');

var Pass = passport;
Pass.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function(username, password, done) {
        User.findOne({ username: username }, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false, { message: "User not found" });
            if (!user.validPassword(password)) return done(null, false, { message: "Password is incorrect" });
//            
//      
            return done(null, user);
        });
    }
));

module.exports = Pass;