console.log("comment.js linked");

$("#comment-submit").on("click", function(event) {
    event.preventDefault();

    var newComment = {
        author: $("#author").val().trim(),
        body: $("#comment-box").val().trim()
    }

    console.log(newComment);

    $.post("/api/comments", newComment)

    .then(function() {
        var row = $("<div>");
        row.addClass("comment");
  
        row.append("<p>" + newComment.author + " just commented: </p>");
        row.append("<p>" + newComment.body + "</p>");
        
  
        $("#comment-area").prepend(row);
    });
    //empty after processing the inputs
    $("#author").val("");
    $("#comment-box").val("");
});

$.get("/api/displaycomments", function(data) {
    if (data.length !==0) {

        for (var i = 0; i< data.length; i++) {
            var row = $("<div>");
            row.addClass("comment");
      
            row.append("<p>" + data[i].author + " commented.. </p>");
            row.append("<p>" + data[i].body + "</p>");
            row.append("<p>At " + moment(data[i].createdAt).format("h:mma on dddd") + "</p>");
      
            $("#comment-area").prepend(row);
        }
    }
});