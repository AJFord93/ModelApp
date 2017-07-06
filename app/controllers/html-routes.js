const db = require('../models');
const passport = require('passport');

module.exports = (app) => {

  app.get('/', function (req, res) {
    res.render('login');
  });

  app.get('/app', isAuthenticated, function (req, res) {
    res.render('app');
  });

// =====================================
// Passport-local ROUTES ===============
// =====================================

    app.post('/login',
        passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
        function(req, res) {
          console.log(req.user);

            res.cookie('signIn', 'true');
            res.redirect('/app');
        });


// =====================================
// FACEBOOK ROUTES =====================
// =====================================

// route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {failureRedirect : '/', failureFlash: true}), function (req, res){
            res.cookie('signIn', 'true');
            res.redirect('/app');
        });



    // ====================================
    // ROUTE FOR LOGGING OUT ==============
    //=====================================
    // app.get('/logout', function(req, res) {
    //     req.logout();
    //     res.redirect('/');
    // });


    // route middleware to make sure a user is logged in
    function isAuthenticated(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())

            return next();
        // if they aren't redirect them to the home page
        res.redirect('/');
    }

  };
