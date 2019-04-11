require("dotenv").config();
var express = require("express");
//We import the passport module and the express-session, 
//both of which we need to handle authentication:
var passport = require("passport");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");

//This module extracts the entire body part of an incoming 
//request and exposes it in a JSON format.
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

//Passport config
require("./config/passport.js")(passport);

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express App
// ============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
// Sets up the Express app to handle data parsing
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//We initialize passport and the express session and 
//passport session and add them both as middleware:
app.use(
  session({
    key: "user_sid",
    secret: "goN6DJJC6E287cC77kkdYuNuAyWnz7Q3iZj8",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 600000 }
  })
);

app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());


//======If we will need handlebars==========
//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");
//========end for handlebars================

// Routes
require("./routes/html-routes.js")(app);
require("./routes/auth-routes.js")(app);
require("./routes/api-routes.js")(app);
//require("./routes/api-routes.js")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});


//==========Code from sample file===========
// var syncOptions = { force: false };

// // If running a test, set syncOptions.force to true
// // clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// // Starting the server, syncing our models ------------------------------------/
// db.sequelize.sync(syncOptions).then(function() {
//   app.listen(PORT, function() {
//     console.log(
//       "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//       PORT,
//       PORT
//     );
//   });
// });
//===================end of code from sapmle file=====

module.exports = app;
