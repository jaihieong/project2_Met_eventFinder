// Requiring our Register model
var db = require("../models");
var passport = require("passport");
//var passport = require("../config/passport.js");
// var bcrypt = require("bcrypt");
// var saltRounds = 10;

//Routes
// =============================================================
module.exports = function(app) {
  //POST route for saving new user
  app.post("/register", function(req, res, next) {
    passport.authenticate("local-register", function(err, user, info) {
      console.log("info", info);
      if (err) {
        console.log("passport err", err);
        return next(err);
      }
      if (!user) {
        console.log("user error", user);
        return res.send({
          success: false,
          message: "authentication failed"
        });
      }
      req.login(user, loginErr => {
        if (loginErr) {
          console.log("loginerr", loginerr);
          return next(loginErr);
        }
        console.log("redirecting....");
        
        res.cookie("first_Name", user.first_name);
        res.cookie("user_id", user.id);
        return res.redirect(200, "/dashboard");
      });
    })(req, res, next);
  });

  app.post("/login", function(req, res, next) {
    passport.authenticate("local-login", function(err, user, info) {
      //console.log("\n\n\n########userrrr", user);
      if (err) {
        console.log("passport err", err);
        return next(err);
      }
      if (!user) {
        return res.send({
          success: false,
          message: "authentication failed"
        });
      }
      req.login(user, loginErr => {
        if (loginErr) {
          console.log("loginerr", loginErr);
          return next(loginErr);
        }

        console.log(user.first_name);
        console.log(user.id);
        console.log("redirecting....");
        res.cookie("firstName", user.first_name);
        res.cookie("user_id", user.id);
        return res.json(true);
      });
    })(req, res, next);
  });

};
