// Requiring our Register model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  //POST route for saving new user
  app.post("/api/register", function(req, res) {
      
      // Add sequelize code for creating a new user using req.body,
      // then return the result using res.json

      console.log(req.body.firstName);
      console.log(req.body.lastName);
      console.log(req.body.email);
      console.log(req.body.password);
       db.Register.create ({
           first_name: req.body.firstName, 
           last_name: req.body.lastName, 
           email: req.body.email, 
           password: req.body.password,
           zipcode: req.body.zipcode,
           user_picture: req.body.picture
       }).then(function(result) {
           //res.json(result);
           res.send("HELLO");

         }).catch (function(err) {
           res.json(err);
         });
  });

  app.post("/api/login", function(req, res) {
      console.log(req.body.email);
      console.log(req.body.password);
      res.send("LOgged in");
      // db.Register.findOne({
      //     where: {
      //       email: req.body.email
      //     }
      // }).then(function (error, results, fields) {
          // if (error) {
          //   // console.log("error ocurred",error);
          //   res.send({
          //     "code":400,
          //     "failed":"error ocurred"
          //   })
          // }else{
          //   // console.log('The solution is: ', results);
          //   if(results.length >0){
          //     if(results[0].password == password){
          //       res.send({
          //         "code":200,
          //         "success":"login sucessfull"
          //           });
          //     }
          //     else{
          //       res.send({
          //         "code":204,
          //         "success":"Email and password does not match"
          //       });
          //     }
          //   }
          //   else{
          //     res.send({
          //       "code":204,
          //       "success":"Email does not exits"
          //     });
          //   }
          // }
          // 
      // });
  });
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
