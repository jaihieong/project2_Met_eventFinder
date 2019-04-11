//var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//var bCrypt = require("bcrypt");
var db = require("../models");
var passwordHash = require('password-hash');


module.exports = function(passport) {

    //var User = db.Register; 
    //console.log(User); === Register
  // passport session setup
  passport.serializeUser(function(user, done) {
    console.log("hi");
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    db.Register.findById(id, function(err, user) {
      console.log("by");

      done(err, user);
      // if (user) {
      //   done(null, user.get());
      // } else {
      //   done(user.errors, null);
      // }
    });
  });

/*
    passport.use("local", new LocalStrategy(
        function(email, password, done) {

            console.log(email);
            console.log(password);

            db.Register.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          });
        }
      ));

*/
      // LOCAL SIGNUP
  passport.use("local-register", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  function(req, email, password, done) {
    console.log(email, password);
    console.log(req);
    process.nextTick(function() {
      db.Register.findOne({
        where: {
          email: email
        }
      }).then(function(user, err) {
        console.log(user);
        if (err) {
          console.log("err", err);
          return done(err);
        }
        if (user) {
          console.log("signupMessage", "That email is already taken.");
          return done(null, false, req.flash("signupMessage", "That email is already taken."));
        } else {
          db.Register.create({
            first_name: req.body.newUserFirstName,
            last_name: req.body.newUserLastName,
            email: req.body.email,
            password: passwordHash.generate(req.body.password),
            zipcode: req.body.newUserZipcode,
            //user_picture: req.body.pic
          }).then(function(dbUser) {
            return done(null, dbUser);
          }).catch(function(err) {
            console.log(err);
          });
        }
      });
    });
  }));

  // LOCAL LOGIN
  passport.use("local-login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  function(req, email, password, done) {
    //console.log(req.body);
    db.Register.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user, err) {
      //console.log(user);
      db.Login.create({
        email: req.body.email,
        password: passwordHash.generate(req.body.password) 
      })
      // var loggedin = false;
      if (!user) {
        console.log("no user found");
        return done(null, false, req.flash("loginMessage", "No user found."));
      }
      if(user && !passwordHash.verify(req.body.password, user.password)) {
      // if (user && !user.validPassword(req.body.password)) {
        return done(null, false, req.flash("loginMessage", "Oops! Wrong password."));
      }
      // loggedin = true;
      // db.Loginstatus.create({
      //   status: loggedin,
      //   email: req.body.email
      // });
      return done(null, user);
    });
  }));
};



//previous code
    // passport.use("local",
    //     new LocalStrategy(
    //         { 
    //             usernameField: "email",
    //             passwordField: "password",
    //             passReqToCallback: true // allows us to pass back the entire request to the callback

    //         }, 
    //         function(email, password, done) {

    //             //Function to check entered logged in password and hasshed one from DB
    //             var isValidPassword = function(userpass, password) {
    //                 return bCrypt.compareSync(password, userpass);
    //             }
    //             console.log(email, password);

    //         //match user
    //         db.Register.findOne ({
    //             where: {
    //                 email: email
    //             }
    //         }).then(function(user) {
    //             // console.log(user.password);
    //             // console.log(password);

    //             //check for existing email in DB
    //             if (user == null){
    //                 console.log("email does not exist in db");
    //                 return done(null, false, {msg: "Email is not registered"});
    //             };

    //             //check for match password
    //             if(!isValidPassword(user.password, password)) {
    //                 console.log("Incorrect password");
    //                 return done(null, false, {message: "Incorrect password"});
    //             } 

    //             //Successfull login
    //             console.log("logged in");
    //             console.log(user.first_name);
    //             console.log(user.last_name);
    //             console.log(user.email);

    //            // return done(null, user, { msg: "Correct login" });
    //         //    var myuser = {
    //         //     email: user.email,
    //         //     password: user.password
    //         //    }
    //            return done(null,user);

    //             }).catch(function(err) {
    //                 console.log("Error:", err);
    //                 return done(null, false, { msg: 'Error with sign in' });
    //             })
    //         })


    //     );

        
    
//}


