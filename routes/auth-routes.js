// Requiring our Register model
var db = require("../models");
var passwordHash = require('password-hash');
//Routes
// =============================================================
module.exports = function(app) {
  //POST route for saving new user
  app.post("/api/register", function(req, res) {
    // console.log(req.body);
    console.log(req.body.newFirstName);
    console.log(req.body.newLastName);
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.password2);
    console.log(req.body.newZipcode);
    
    
    //Add sequelize code for creating a new user using req.body,
    //then return the result using res.json

    //Check err
    var errors = [];
    //Check required fields
    if(!req.body.newFirstName || !req.body.newLastName || !req.body.password2 || !req.body.email || !req.body.password || !req.body.newZipcode) {
      console.log("something is wrong");
      errors.push({msg: "Please fill all the fields"});
    }
    //Check passwords match
    if(req.body.password !== req.body.password2) {
      console.log("passwords are not matching");
      errors.push({ msg: "passwords do not match"});
    }
    //Check password length
    if(req.body.password.length < 6) {
      console.log("password should be at least 6 caracters");
      errors.push({ msg: "Password should be at least 6 characters"});
    }
    console.log(errors);
    if(errors.length > 0) {
      res.render("register", {
        errors: errors,
        // newFirstName: req.body.newFirstName, 
        // newLastName: req.body.newLastName, 
        // email: req.body.email, 
        // password: passwordHash.generate(req.body.password),
        // newZipcode: req.body.newZipcode,
        // user_picture: req.body.picture
      });
    } else {
      db.Register.findOne({ 
            where: {
              email: req.body.email
            }
      }).then(function(user) {
         if(user) {
          //user exists
          errors.push({msg: "Email is already registered"});
          res.render("register", {
            errors
          });
        } else {
          db.Register.create ({
            first_name: req.body.newFirstName, 
            last_name: req.body.newLastName, 
            email: req.body.email, 
            password: passwordHash.generate(req.body.password),
            zipcode: req.body.newZipcode,
            user_picture: req.body.picture
          }).then(function(result) {
             res.json(result);
            
            // res.send("HELLO");
 
          }).catch (function(err) {
            res.json(err);
          });
 
        } 
      
      })
    }

  
//=============simple first part working=====
    // console.log(req.body.newFirstName);
    // console.log(req.body.newLastName);
    // console.log(req.body.email);
    // console.log(req.body.password);
    // console.log(req.body.password2);
      
    // db.Register.create ({
    //   first_name: req.body.newFirstName, 
    //   last_name: req.body.newLastName, 
    //   email: req.body.email, 
    //   password: req.body.password,
    //   newZipcode: req.body.newZipcode,
    //   user_picture: req.body.picture
    // }).then(function(result) {
    //   //res.json(result);
    //   res.send("HELLO");
    // }).catch(function(err) {
    //   res.json(err);
    // });
    //================end first working part=======
  });

  var login = function() {
    app.post("/api/login", function(req, res) {
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
          if (results == null){
            console.log("email does not exist in db");
            res.send({
              "code":204,
              "success":"Email does not exist//outer"
            });
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
            console.log("The password: " + results.password);
            console.log(results.first_name);
            if(results.email !== null){
              console.log("result length if statament");
              console.log(passwordHash.verify(req.body.password, results.password));
              // checks password with db password
              if(passwordHash.verify(req.body.password, results.password)){
                var loginstatus = true;
                // console.log(results); database record matching the email
                console.log("Login successful with email: " + results.email);
                // db.Loginstatus.create ({
                //   email: results.email, 
                //   status: loginstatus
                // }).then (function(loginstatus) {
                //   // We have access to the new todo as an argument inside of the callback function
                //   console.log(loginstatus.status);
                //   res.json(loginstatus);
                // })
                console.log(results.first_name);
                res.json(results);
                
                // res.render("dashboard", {name: results.first_name});
                // res.json(results);
                // res.send({
                //   "code":200,
                //   "success":"login sucessfull"
                //     });
              }
              else{
                res.redirect("login");
                res.send({
                  "code":204,
                  "success":"Email and password does not match"
                });
              }
            } 
            else {
              
              res.send({
                "code":204,
                "success":"Email does not exist//outer"
              });
            }
        }
        // }
        // res.json(results);
      });
    });
  };

  login();

};



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
