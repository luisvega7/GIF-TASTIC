$(document).ready(function() {

    var teams = [
      "Oakland Raiders", "Los Angeles Chargers", " Denver Broncos", "KC Chiefs", "SF 49ers","Seattle Seahawks", 
      " AZ Cardinals", "Los Angeles Rams", "Dallas Cowboys", "Philly Eagles", "Washington Redskins", "New York Giants", 
      "Buffalo Bills", "New England Patriots", "Miami Dolphins", "New York Jets", "Minnesota Vikings", "Chicago Bears",
      "Green Bay Packers",  "Detroit Lions", "Houston Texans", "Indianapolis Colts", "Jacksonville Jaguars", "Tennessee Titans", "Carolina Panthers",
      "Atl Falcons", "New Orleans Saints", "Tampa Bay Buccaneers", 
    ];
  
    // function that makes buttons on appear on page
    function addButtons() {
      $("#NFL-buttons").empty();
  
      for (var i = 0; i < teams.length; i++) {
        var a = $("<button>");
        a.addClass("NFL-buttons");
        a.attr("data-type", teams[i]);
        a.text(teams[i]);
        $("#NFL-buttons").append(a);
      }
  
    }
  //click events that reqest team gifs
    $(document).on("click", ".NFL-buttons", function() {
      $("#Squads").empty();
      $(".NFL-buttons").removeClass("active");
      $(this).addClass("active");
  
      var type = $(this).attr("data-type");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=UGAWk49Nlb1I7MF8g3UVFTWjzcKfwZQX&limit=10";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
          console.log(response.data);
  //for loop that adds gifs
          for (var i = 0; i < results.length; i++) {
            var endzone = $("<div>");
  //rating variable
            var rating = results[i].rating;
  
            var p = $("<p>").text("Rating: " + rating);
  //animation that starts and pauses the GIFS. 
            var animation = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
  
           var nflLogo = $("<img>");
          nflLogo.attr("src", animation);
          nflLogo.attr("data-animation", still);
          nflLogo.attr("data-still", animation);
          nflLogo.attr("data-state", "animation");
          nflLogo.addClass(".NFL-buttons");
  
            endzone.append(p);
            endzone.append(nflLogo);
  
            $("#Squads").append(endzone);
          }
        });
    });
  //click function that changes the animation of gifs
    $(document).on("click", ".NFL-buttons", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    console.log("NFL-buttons");  
    }
    });
  //adding new teams on click of button
    $("#add-team").on("click", function(event) {
      event.preventDefault();
      var newTeam= $("input").eq(0).val();
  
      if (newTeam.length > 2) {
        teams.push(newTeam);
      }
  //adding the buttons to the correct parts of page
      addButtons(teams, "NFL-buttons", "#NFL-TEAMS");
  
    });
  
    addButtons(teams, "NFL-buttons", "#NFL-TEAMS");
  });
  
