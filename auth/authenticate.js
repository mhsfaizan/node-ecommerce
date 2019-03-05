const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require("../model/admin/admin");


passport.use('local', new LocalStrategy(
    function (username, password, done) {
        Admin.findOne({username,password},(err,user)=>{
            if(err) return done(err);
            return done(null,user);
        })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    Admin.findById(id,(err,user)=>{
        done(err, user);
    })
});