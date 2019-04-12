console.log("eventAPI.js linked");

// Weather API
$("#searchbtn").on("click", function () {

  var zipCode = $("#userZip").val().trim();
  var queryURL = "https://api.aerisapi.com/forecasts/" + zipCode + "?&format=json&filter=daynight&from=friday&to=+1days&limit=1&client_id=Ykw9spzB2RG7Ik8FFmw9N&client_secret=33qIcxRcSahYSrtE1Vg9rsP3VG5srtYsR690rCTd";

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

        $("#forecast").prepend(weatherDiv);
      }
    }
  })
});

//eventful API
$("#searchbtn").on("click", function() {

    var categories = []; //list of categories
    var userZip = $("#userZip").val().trim();
    var userCat = $("#userCat").val().trim();
    
    var oArgs = {
        
        where: test1,
        app_key: "Zdp7TJQBkTgdJwbM",
        q: test2,
        "date": "future",
        page_size: 3,
        sort_order: "popularity",
        within: 25
 };
    var test1 = oArgs.q = userCat;
    var test2 = oArgs.where = userZip;
    console.log(oArgs);

 EVDB.API.call("/events/search", oArgs, function(oData) {

    var result = oData.events.event;
    console.log(result);

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



