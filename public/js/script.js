console.log("script.js linked");
// $(function () {
//   //Submit button clicked in register form
//   $(".submitButton").on("click", function (event) {
//       event.preventDefault();
//       // var newUserFirstName = $("#firstN").val();
//       // var newUserLastName = $("#lastN").val();
//       // var newUserEmail = $("#userEmail").val();
//       // var newUserPassword = $("#userPaswsword").val();

//       // console.log(newUserFirstName);
//       // console.log(newUserLastName);
//       // console.log(newUserEmail);
//       // console.log(newUserPassword);
//   //Grabbing all the inputs from the filled form
//       var newUser = {
//           newUserFirstName = $("#firstN").val(),
//           newUserLastName = $("#lastN").val(),
//           newUserEmail = $("#userEmail").val(),
//           newUserPassword = $("#userPassword").val(),
//           //newUserZipcode = $("#zip").val()
//        };
//   //Calling to  the server for storing the the user info
//       $.ajax("/api/register", {
//           type: "POST",
//           data: newUser
//       }).then(
//           function () {
//               console.log("New user registered");
//               location.reload();
//           }
//       );
//   });

//   //Submit button from log in page
//   $(".loginbutton").on("click", function (event) {
//       event.preventDefault();
//       //  var userEmail = $("#userLogInEmail").val();
//       //  var password = $("#userLogInPassword").val();

//       //  console.log(userEmail);
//       //  console.log(password);


//       var userLogin = {
//           userEmail = $("#userLogInEmail").val(),
//           userPassword = $("#userLogInPassword").val()
//       };

//       //Calling to  the server for storing the the user info
//       $.ajax("/api/login", {
//           type: "POST",
//           data: userLogin
//       }).then(
//           function () {
//               console.log("User logged in");
//               location.reload();
//           }
//       );
  
//   });

// });








// //=========================================================
// //from SAMPLE index.js file
// //=========================================================

// // // Get references to page elements
// // var $exampleText = $("#example-text");
// // var $exampleDescription = $("#example-description");
// // var $submitBtn = $("#submit");
// // var $exampleList = $("#example-list");

// // // The API object contains methods for each kind of request we'll make
// // var API = {
// //   saveExample: function(example) {
// //     return $.ajax({
// //       headers: {
// //         "Content-Type": "application/json"
// //       },
// //       type: "POST",
// //       url: "api/examples",
// //       data: JSON.stringify(example)
// //     });
// //   },
// //   getExamples: function() {
// //     return $.ajax({
// //       url: "api/examples",
// //       type: "GET"
// //     });
// //   },
// //   deleteExample: function(id) {
// //     return $.ajax({
// //       url: "api/examples/" + id,
// //       type: "DELETE"
// //     });
// //   }
// // };

// // // refreshExamples gets new examples from the db and repopulates the list
// // var refreshExamples = function() {
// //   API.getExamples().then(function(data) {
// //     var $examples = data.map(function(example) {
// //       var $a = $("<a>")
// //         .text(example.text)
// //         .attr("href", "/example/" + example.id);

// //       var $li = $("<li>")
// //         .attr({
// //           class: "list-group-item",
// //           "data-id": example.id
// //         })
// //         .append($a);

// //       var $button = $("<button>")
// //         .addClass("btn btn-danger float-right delete")
// //         .text("ｘ");

// //       $li.append($button);

// //       return $li;
// //     });

// //     $exampleList.empty();
// //     $exampleList.append($examples);
// //   });
// // };

// // // handleFormSubmit is called whenever we submit a new example
// // // Save the new example to the db and refresh the list
// // var handleFormSubmit = function(event) {
// //   event.preventDefault();

// //   var example = {
// //     text: $exampleText.val().trim(),
// //     description: $exampleDescription.val().trim()
// //   };

// //   if (!(example.text && example.description)) {
// //     alert("You must enter an example text and description!");
// //     return;
// //   }

// //   API.saveExample(example).then(function() {
// //     refreshExamples();
// //   });

// //   $exampleText.val("");
// //   $exampleDescription.val("");
// // };

// // // handleDeleteBtnClick is called when an example's delete button is clicked
// // // Remove the example from the db and refresh the list
// // var handleDeleteBtnClick = function() {
// //   var idToDelete = $(this)
// //     .parent()
// //     .attr("data-id");

// //   API.deleteExample(idToDelete).then(function() {
// //     refreshExamples();
// //   });
// // };

// // // Add event listeners to the submit and delete buttons
// // $submitBtn.on("click", handleFormSubmit);
// // $exampleList.on("click", ".delete", handleDeleteBtnClick);
