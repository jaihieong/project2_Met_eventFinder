// Requiring our Register model
var db = require("../models");
var passwordHash = require('password-hash');
// boolean to mimic loggedin features
var loggedin = false;

//Routes
// =============================================================
module.exports = function (app) {
  
  //POST route for saving new user
  app.post("/api/register", function (req, res) {

    console.log(req.body.firstName);
    console.log(req.body.lastName);
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.password2);

    //Check err
    var errors = [];
    //Check required fields
    if (!req.body.firstName || !req.body.lastName || !req.body.password2 || !req.body.email || !req.body.password || !req.body.zipcode) {
      console.log("something is wrong");
      errors.push({ msg: "Please fill all the fields" });
    }
    //Check passwords match
    if (req.body.password !== req.body.password2) {
      console.log("passwords are not matching");
      errors.push({ msg: "passwords do not match" });
    }
    //Check password length
    if (req.body.password.length < 6) {
      console.log("password should be at least 6 caracters");
      errors.push({ msg: "Password should be at least 6 characters" });
    }
    console.log(errors);

    //If any errors found in filling up the form
    if (errors.length > 0) {
      res.render("register", {
        errors: errors,
        // firstName: req.body.firstName, 
        // lastName: req.body.lastName, 
        // email: req.body.email, 
        // password: passwordHash.generate(req.body.password),
        // zipcode: req.body.zipcode,
        // user_picture: req.body.picture
      });
    } else {
      //When validation passed. 
      //Checking if the email exist in our DB
      db.Register.findOne({
        where: {
          email: req.body.email
        }
      }).then(function (user) {
        if (user) {
          //user exist. Throw error that such email is registered.
          errors.push({ msg: "Email is already registered" });
          res.render("register", {
            errors
          });
        } else {
          //Add sequelize code for creating a new user using req.body,
          //then return the result using res.json
          db.Register.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: passwordHash.generate(req.body.password),
            zipcode: req.body.zipcode,
            user_picture: req.body.picture
          }).then(function (result) {
            //res.json(result);
            //res.send("HELLO");
            res.redirect("/login");
            // res.render("login", {
            //   msg: "You are registered, now you can log in"
            // });


          }).catch(function (err) {
            res.json(err);
          });

        }

      })
    }
    //=============simple first part working=====
    // console.log(req.body.firstName);
    // console.log(req.body.lastName);
    // console.log(req.body.email);
    // console.log(req.body.password);
    // console.log(req.body.password2);

    // db.Register.create ({
    //   first_name: req.body.firstName, 
    //   last_name: req.body.lastName, 
    //   email: req.body.email, 
    //   password: req.body.password,
    //   zipcode: req.body.zipcode,
    //   user_picture: req.body.picture
    // }).then(function(result) {
    //   //res.json(result);
    //   res.send("HELLO");
    // }).catch(function(err) {
    //   res.json(err);
    // });
    //================end first working part=======
  });

  app.post("/api/login", function (req, res) {
    console.log(req.body.email);
    console.log(req.body.password);
    var email = req.body.email;
    var password = req.body.password;
    console.log("start of app.post for login");
    // res.send("LOgged in");
    db.Register.findOne({

      where: {
        email: email
      }

    }).then(function (results) {
      //If the login email does not exist in our DB. Letting know about this to user
      if (results == null) {
        console.log("email does not exist in db");
        res.render("login", {
          msg: "Sorry, such email does not exist"
        });

        // res.send({
        //   "code":204,
        //   "success":"Email does not exist//outer"
        // });
      } else {
        // if (error) {
        //       // console.log("error ocurred",error);
        //       console.log("error if statement_Jai");
        //       res.send({
        //         "code":400,
        //         "failed":"error ocurred"
        //       })
        //   }else{

        console.log("The email: " + results.email);
        console.log("The password: " + req.body.password);
        if (results.email !== null) {
          console.log("result length if statament");
          console.log(passwordHash.verify(req.body.password, results.password));

          if (passwordHash.verify(req.body.password, results.password)) {
            console.log(results.first_name);
            db.Login.create({
              email: req.body.email,
              password: passwordHash.generate(req.body.password)
              
            }).then(function (result) {
              //res.json(result);
              //res.send("HELLO");
              // res.redirect("/login");
              // res.render("login", {
              //   msg: "You are registered, now you can log in"
              // });
  
  
            }).catch(function (err) {
              res.json(err);
            });
            // boolean to mimic loggedin features
            loggedin = true;

            if (loggedin){
              console.log("logged in");
            }
            res.redirect("/dashboard");
            // res.render("dashboard", {
            //   name: results.first_name
            // });
            // res.json(results);
            // res.send({
            //   "code":200,
            //   "success":"login sucessfull"
            //     });
          }
          else {
            //In the case when login email and password dont match
            res.render("login", {
              msg: "Email and password do not match"
            });

            // res.send({
            //   "code":204,
            //   "success":"Email and password does not match"
            // });
          }
        }
        else {
          //?????????????????????? - do we need it, Jai? --- line 124 -- isn't the same?
          res.send({
            "code": 204,
            "success": "Email does not exist//outer"
          });
        }
      }
    });
  });

  app.get("/api/login", function (req, res) {
    console.log(req.body.email);
    res.render("dashboard", {
      msg: "PROFILE PAGE"
    });
  });

};

// module.exports = {
//   loggedin: loggedin
// };



//==========================================================
//Code from sample file
//==========================================================


// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

//   // Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });
// };