//=================================================================
// Dependencies
//=================================================================
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const logger = require('morgan');
const db = require("./app/models");

//=================================================================
// Initialize new Express app
//=================================================================
const app = express();

// =================================================================
// Use logger middleware so 💩💩💩💩 prints to the console.
// =================================================================
app.use(logger('dev'));

// =================================================================
// Configure body-parser middleware
// =================================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//=================================================================
// Configure method-override middleware
//=================================================================
app.use(methodOverride("_method"));

// =================================================================
// Handlebars view engine setup
// =================================================================
const handlebarsHelpers = require('./app/views/helpers/global-helpers');

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: './app/views/layouts/',
    partialsDir: './app/views/partials/',
    helpers: handlebarsHelpers
}));

app.set('view engine', '.hbs');
app.set('views', 'app/views/');
const PORT = process.env.PORT || 8080;

//=================================================================
// Serve static assets from /public route
//=================================================================
app.use('/public', express.static('./app/public/'));

//=================================================================
// Passport Config
//=================================================================
const session = require('express-session');
const passport = require('passport');

require('./app/config/passport.js')(passport);

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // express session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions





//=================================================================
// Configure route controllers -- Note: Add Passport 2nd Arguement ****
//=================================================================
require('./app/controllers/html-routes')(app, passport);
require('./app/controllers/api-routes')(app, passport);

// ================================================================
// Catch 404 errors, render 404 page with message.
// ================================================================
app.use((req, res) => {
    res.status(404).render('404', { message: 'Page Not Found' });
});

//=================================================================
// Grab env port and start listening on all network interfaces
//=================================================================

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});


// app.listen(PORT);
// console.log(PORT);
