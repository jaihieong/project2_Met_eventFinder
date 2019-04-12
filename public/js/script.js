console.log("script.js linked");

console.log("script.js file is connected");
$(function () {
  //Submit button clicked in register form
  $(".submitButton").on("click", function (event) {
      event.preventDefault();
      var newFirstName = $("#firstN").val();
      var newLastName = $("#lastN").val();
      var email = $("#userEmail").val();
      var password = $("#userPassword").val();
      var password2 = $("#userPassword2").val();

      console.log(newFirstName);
      console.log(newLastName);
      console.log(email);
      console.log(password);
  //Grabbing all the inputs from the filled form
    var newUser = {
          newFirstName: $("#firstN").val(),
          newLastName: $("#lastN").val(),
          email: $("#userEmail").val(),
          password: $("#userPassword").val(),
          password2: $("#userPassword2").val(),
          newZipcode: $("#zip").val()

       };
    if (newUser.password.length > 0 && newUser.email.length > 0 && newUser.newLastName.length > 0 && newUser.newFirstName.length > 0 && newUser.newZipcode > 0) {

  //Calling to  the server for storing the the user info
      //$.ajax("/api/register", {
        $.ajax({
          type: "POST",
          url: "/api/register",
          data: newUser
        }).then(
          function () {
            // console.log(data);
            //window.location.href = "/login";
            location.replace("/login");
            console.log("New user registered");
        });
    } else {
        console.log("fill all fields please *****");
        //$("#create-err-msg").empty("").text("**Please fill out entire form**");

    }
  });

  $(".loginbutton").on("click", function(event) {
    event.preventDefault();
    var user = {
      email: $("#userLogInEmail").val(),
      password: $("#userLogInPassword").val()
    };
    $.post("/api/login", user, function(results) {
        console.log(results);
        console.log("email from script.js: " + results.email);

        // Clear sessionStorage
        sessionStorage.clear();

        // Store all content into sessionStorage
        sessionStorage.setItem("firstname", results.first_name);
        sessionStorage.setItem("lastname", results.last_name);
        sessionStorage.setItem("zipcode", results.zipcode);
        sessionStorage.setItem("email", results.email);
        sessionStorage.setItem("id", results.id);
        

        console.log(user);
        console.log("loggin went");

        location.replace("/dashboard");
        

        // window.location.href = "/";

    //   if (results) {
    //     $.get("/api/users/key", user, function(results) {
    //       if (results) {
    //         $(location).attr("href", "/ludus-magnus");
    //       } else {
    //         $(location).attr("href", "/character");
    //       }
    //     });
    //   } else {
    //     $("#account-info").modal("close");
    //     alert("oops something went wrong, please try again!");
    //   }
    });
  });
  
  function myFunction() {
    $("#test-name").text(sessionStorage.getItem("firstname"));
  }









  //Submit button from log in page
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

});