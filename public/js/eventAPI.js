console.log("eventAPI.js linked");

// Weather API
$("#searchbtn").on("click", function () {

  var userZip = $("#zipCode").val().trim();
  var queryURL = "https://api.aerisapi.com/forecasts/" + userZip + "?&format=json&filter=daynight&from=friday&to=+1days&limit=1&client_id=Ykw9spzB2RG7Ik8FFmw9N&client_secret=33qIcxRcSahYSrtE1Vg9rsP3VG5srtYsR690rCTd";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function (response) {

    if (!response.success) {
      console.log('Weather Information is not available at the moment!')
    } else {

      var weatherDiv = $("<div>");

      var results = response.response[0].periods;
      
      console.log(results);

      for (var i = 0; i < results.length; i++) {

        var maxF = $("<p>").text("High: " + results[i].maxFeelslikeF);
        //console.log(maxF);
        var minF = $("<p>").text("Low: " + results[i].minFeelslikeF);
        var weather1 = $("<p>").text(results[i].weather);
        var ts = results[i].timestamp;
        console.log(ts);
        var dateString = moment(ts).calendar();
        console.log(dateString);
        var dateandTime = $("<p>").text(dateString);
        var formatedDate = moment(dateandTime).format("LLLL");

        var iconShow = results[i].icon;
        var iconImage = $("<img>");
        iconImage.attr("src", "http://cdn.aerisapi.com/wxblox/icons/" + iconShow);
        weatherDiv.append(iconImage);
        weatherDiv.append(maxF);
        weatherDiv.append(minF);
        weatherDiv.append(formatedDate);
        weatherDiv.append(weather1);

        $("#forecast").empty();
        $("#forecast").prepend(weatherDiv);
      }
    }
  })
});

//eventful API
$("#searchbtn").on("click", function() {

    var categories = []; //list of categories
    var userZip = $("#zipCode").val().trim();
    var userCat = $("#userCat").val().trim();
    
    var oArgs = {
        
        where: test1,
        app_key: "Zdp7TJQBkTgdJwbM",
        q: test2,
        "date": "future",
        page_size: 10,
        sort_order: "popularity",
        within: 25
 };
    var test1 = oArgs.q = userCat;
    var test2 = oArgs.where = userZip;
    console.log(oArgs);

 EVDB.API.call("/events/search", oArgs, function(oData) {

    var result = oData.events.event;
    console.log(result);
    $("#event").empty();
    for (var i =0; i<result.length; i++){

        var eventDiv = $("<div>");

        var city = $("<p>").text("Event City: " + result[i].city_name);
        console.log(city);
        var id = $("<p>").text("id: " + result[i].id);
        var startTime = $("<p>").text("Start Time: " + result[i].start_time);
        var title = $("<p>").text("Title: " + result[i].title);
        var venueAddress = $("<p>").text("Venue Address: " + result[i].venue_address);
        
        var urlInfo = $("<button>").text("More Information");
        urlInfo.attr("src", result[i].url);

        var eventImage = $("<img>");
        eventImage.attr("src", result[i].image.medium.url);
        
        var goingbtn = $("<btn>");

        eventDiv.addClass("clickable");
        eventDiv.attr("id", result[i].id);
        eventDiv.append(eventImage);
        eventDiv.append(title);
        eventDiv.append(startTime);
        eventDiv.append(venueAddress);
        eventDiv.append(city);
        eventDiv.append(goingbtn);
        //eventDiv.append(urlInfo);

        
        $("#event").append(eventDiv);
        $("#going");
  
   }
   
   
 });

});

$("#event").on("click", "div", function() {
  event.preventDefault();

  console.log("clicked");
  var choice = $(this).attr("id");
  console.log(choice);
  var eventID = {
    id: choice
  };

  $.ajax({
    type: "POST",
    url: "/api/event",
    data: eventID
  }).then(function(result) {
    console.log(result)
    console.log(result.address);
    console.log(result.city);
    console.log(result.description);
    console.log(result.title);
    console.log(result.start_time);
    console.log(result.venue_name);
    console.log(result.images.image[0].medium.url);

    // Clear sessionStorage
    sessionStorage.clear();

    // Store all content into sessionStorage
    sessionStorage.setItem("address", result.address);
    sessionStorage.setItem("city", result.city);
    sessionStorage.setItem("title", result.title);
    sessionStorage.setItem("description", result.description);
    sessionStorage.setItem("start_time", result.start_time);
    sessionStorage.setItem("venue_name", result.venue_name);
    sessionStorage.setItem("image", result.images.image[0].medium.url);

    location.replace("/event");

  });


  // var eventQuery = "https://api.eventful.com/json/events/get?&id="+choice+"E0-001-123080839-5&app_key=Zdp7TJQBkTgdJwbM";
  // //console.log(eventQuery);

  // $.ajax({
  //   url: eventQuery,
  //   method: "GET"
  // })
  // .then(function (response) {
  
  //   var newDiv = $("<div>");
  //   newDiv.append(response.id);
  //   console.log(response.id);
  //   $("#event-detail").append(newDiv);
  // })
  // //User click on recipeID, this way we able to pull the index of recipe
  // var choice = $(this).attr("id");
  // console.log(choice);
  // //Having index of recipe we can pull out the recipeID from array
  // var singleRecipeID = recipeArray[choice];
  // console.log(singleRecipeID);
  // var appID = "c264894e&";
  // //
  // var apiKey = "f5984f792fe199d55811bb9a14dd9e5c";
  // // Here we are building the URL we need to query the database
  // var queryURL = "https://api.yummly.com/v1/api/recipe/" + singleRecipeID + "?_app_id=" + appID + "&_app_key=" + apiKey;

  // // Here we run our AJAX call to the OpenWeatherMap API
  // $.ajax({
  // url: queryURL,
  // method: "GET"
  // })
  // // We store all of the retrieved data inside of an object called "response"
  // .then(function(response) {
  //     //Empty the div container from the list of recipes,
  //     //for displaying the single recipe result
  //     $("#containerResults").empty();
  //     //Create variables to store the name, image and ingredient list of single recipe
  //     var singleRecipeName = response.name;
  //     var singleRecipeImgURL = response.images.hostedMediumUrl;
  //     var singleRecipeIngredients = response.ingredientLines;
  //     //Create elements in HTML to hold the name, image and ingredient list
  //     var singleRecipeNameDisplay = $("<p>").text(singleRecipeName);
  //     var singleRecipeImgDisplay = $("<img>").attr("src", singleRecipeImgURL);
  //     var singleRecipeIngredientsDisplay = $("<p>").text("Ingredients: " + singleRecipeIngredients);
  //     //Display in HTML all the above data
  //     $("#containerResults").append(singleRecipeNameDisplay, singleRecipeImgDisplay, singleRecipeIngredientsDisplay);
  // //console.log(response);
  // });
});


$("#going").on("click", function(event) {
    event.preventDefault();
    // Send the POST request.
    $.ajax("/going", {
      type: "POST",
      data: goingEvent
    }).then(
      function() {
        console.log("added new event");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $("#maybe").on("click", function(event) {
     event.preventDefault();
    // Send the PUT request.
    $.ajax("/maybe/" + id, {
      type: "PUT",
      data: maybeEvent
    }).then(
      function() {
        console.log("updated id ", id);
        location.reload();
      }
    );
  });



