var ballparkName = 'Oracle Park';

function isDateLaterThan(a, b) {
  return a > b;
}

/* from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date */
function ISODateString(d){
    function pad(n){return n<10 ? '0'+n : n;}
    return d.getUTCFullYear()+'-'+ pad(d.getUTCMonth()+1)+'-'+ pad(d.getUTCDate());
}

$(document).ready(function(){
    var url = 'data/giants2020schedule.json';

    var today = new Date();
    var nextGame = null;
    var todaysGame = null;

    // Format date as MM/DD/YY
    var curr_date = today.getDate();
    var curr_month = today.getMonth() + 1;
    var curr_year = today.getFullYear();
    // var dateString = curr_month + "/" + curr_date + "/" + curr_year;

    // Create datepicker
    // $("#datecheck").html('Checking <input id="datepicker" type="text">');
    // $("#datepicker").datepicker();

    // $(".datepicker").datepicker.("setDate", dateString);

    // Check for game today
    $.getJSON(url, function(json){
        var nextGameDate;

        $.each(json.games,function(i,game){
            nextGameDate = new Date(game.date);

            // Uncomment for debugging
            //console.log("Today: " + today + " - Looking at game: " + nextGameDate);

          if (!nextGame && isDateLaterThan(nextGameDate, today)){
            nextGame = game;
            return false; // break the loop
          }

            if(today.getYear() == nextGameDate.getYear() && today.getMonth() == nextGameDate.getMonth() && today.getDate() == nextGameDate.getDate()) {
              todaysGame = game;
              nextGame = json.games[i+1];
              return false; // break the loop
            }
        });

        var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

        if (todaysGame) {
            $(".fill-in").text("YES");
            $("#game .summary").text("Giants play the " + todaysGame.opponent);
            $("#game .location").text(todaysGame.location);
            $("#game .tstart").text(todaysGame.time);

            $("#game abbr").attr('title', ISODateString(nextGameDate));
            if (todaysGame.location.includes(ballparkName)) {
                $("body").addClass("home");
                $("#yesno .homeaway").text("At home");
             }
             else {
                $("body").addClass("away");
                $("#yesno .homeaway").text("Away");
                $("#yesno").css("border-color", "#000");
             }
            $("#game").show();

	    //add small text for next game
            $("#next .next-location").text(nextGame.location);
            $("#next .nstart").text(nextGame.time);
            nextGameDate = new Date(nextGame.date);
            $("#next .next-day").text(weekday[nextGameDate.getDay()] + ", " + (nextGameDate.getMonth()+1) + "/" + nextGameDate.getDate());
            $("#next").show();
            
        }
        else {
          $(".fill-in").text("NO");
          $("#game .date").text(nextGame.date);
          $("#game .summary").text("Giants will play the " + nextGame.opponent);
          $("#game .location").text(nextGame.location);

          // Format next game date as day of the week
          var nextGameDay = weekday[nextGameDate.getDay()];
          $("#game .day").text("on " + nextGameDay);
          $("#game .tstart").text(nextGame.time);
          // if (nextGame.location == ballparkName) {
          //  $("#nextgame .location").addClass("homegame");
          //   $("body").addClass("homegame-bg");
          // }
          $("#game").show();
        }
    });
});
