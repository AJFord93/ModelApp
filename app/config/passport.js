'use strict';

// =================================================================
// Passport Configuration
// ==========================================================

//Declaring Dependencies
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('../models');


//loading our auth properties
var configAuth = require('./auth');

module.exports = function(app,Profile) {

// =================================================================
// Local Strategies
// =================================================================
    // 
    // passport.use(new LocalStrategy(
    //     function(username, password, done) {
    //         User.findOne({ username: username }, function (err, user) {
    //             if (err) { return done(err); }
    //             if (!user) { return done(null, false); }
    //             if (!user.verifyPassword(password)) { return done(null, false); }
    //             return done(null, user);
    //         });
    //     }
    // ));



// =================================================================
// Facebook Strategies
// =================================================================

    passport.use(new FacebookStrategy({


            clientID        : configAuth.facebookAuth.clientID,
            clientSecret    : configAuth.facebookAuth.clientSecret,
            callbackURL     : configAuth.facebookAuth.callbackURL,
            profileFields   : ['id', 'displayName', 'photos', 'email', 'first_name', 'gender', 'last_name']

        },


        function(token, refreshToken, profile, done) {


            process.nextTick(function () {

                db.User.findOrCreate({ where: {
                    fbID: profile.id,
                    first_name: profile.name.givenName,
                    last_name: profile.name.familyName,
                    imageURL: profile.photos[0].value,
                    email: profile.emails[0].value
                  }

              }).spread(function(user){
                    return done(null, user);
                  });
        });
    }));



    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });


    passport.deserializeUser(function(id, done) {
        db.User.find({
            where:{
                id: id
            }
        }).then(function(user){
            if (!user) return done(new Error('Invalid user'));
            return done(null,user);
        })
    });

};
