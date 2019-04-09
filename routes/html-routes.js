//Requiring path for displaying the files from views folder
var path = require("path");
var express = require("express");

module.exports = function(app) {

    // test route
        // app.get('/', function(req, res) {
        //     res.json({ message: 'welcome!!!' });
        // });
        // app.get("/register", function(req, res) {
        //     res.send("Register here");
        // });
        // app.get("/login", function(req, res) {
        //     res.send("Login here");
        // });
        
        //Route to see welcome page
        app.get("/", function(req, res) {
            res.render("welcome");
        })

        //Route to see the sign up page
         app.get("/register", function(req, res) {
            res.render("register");
            
         });

        //Route to see log in page
         app.get("/login", function(req, res) {
            res.render("login");
         });
        //Route to see dashboard/profile page
        app.get("/dashboard", function (req, res) {
            res.render("dashboard");
        });
    
    
};





//===============================================
//Sample code 
//===============================================
// var db = require("../models");

// module.exports = function(app) {
//   // Load index page
//   app.get("/", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.render("index", {
//         msg: "Welcome!",
//         examples: dbExamples
//       });
//     });
//   });

//   // Load example page and pass in an example by id
//   app.get("/example/:id", function(req, res) {
//     db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.render("example", {
//         example: dbExample
//       });
//     });
//   });

//   // Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.render("404");
//   });
// };
