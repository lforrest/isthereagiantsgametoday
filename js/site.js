function isDateLaterThan(a, b) {
  return a > b;
}

/* from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date */
function ISODateString(d){  
    function pad(n){return n<10 ? '0'+n : n;}  
    return d.getUTCFullYear()+'-'+ pad(d.getUTCMonth()+1)+'-'+ pad(d.getUTCDate());
}  

$(document).ready(function(){
    var url = 'data/giants2014schedule.json';

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
            console.log("Today: " + today + " - Looking at game: " + nextGameDate);

            console.log("testing ", today.getDate(), "against", nextGameDate.getMonth(), "/", nextGameDate.getDate());
/*          if (!nextGame && isDateLaterThan(nextGameDate, today)){
            nextGame = game;
            return false; // break the loop
          }*/
          
            if(today.getYear() == nextGameDate.getYear() && today.getMonth() == nextGameDate.getMonth() && today.getDate() == nextGameDate.getDate()) {
              todaysGame = game;
              return false; // break the loop
            }            
        });
        
        if (todaysGame && todaysGame.location == "AT&T Park") {
            if (todaysGame.time == "7:15pm")
                $(".fill-in").text("YES");
            else if(todaysGame.time == "6:05pm")
                $(".fill-in").text("EARLY-ISH");
            else
                $(".fill-in").text("EARLY");
            $("#game .summary").text("Giants play the " + todaysGame.opponent);
            $("#game .location").text(todaysGame.location);
            $("#game .tstart").text(todaysGame.time);
            
            $("#game abbr").attr('title', ISODateString(nextGameDate));
            if (todaysGame.location == "AT&T Park") {
                $("body").addClass("home");
                $("#yesno .homeaway").text("");
             }
             else {
                $("body").addClass("away");
                $("#yesno .homeaway").text("Away");
                $("#yesno").css("border-color", "#000");
             }
            $("#game").show();
        }
        else {
          $(".fill-in").text("NO?");
          //$("#game .date").text(nextGame.date);
          $("#game .summary").text("No game, but no guarantees...");
          $("#game .location").text(nextGame.location);
          
          // Format next game date as day of the week
          var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
          var nextGameDay = weekday[nextGameDate.getDay()];
          $("#game .day").text("");
          $("#game .tstart").text("");
          // if (nextGame.location == "AT&T Park") {
          //  $("#nextgame .location").addClass("homegame");
          //   $("body").addClass("homegame-bg");
          // }
          $("#game").show();
          $("#attext").hide();
          $(".dtstart .location").hide();
        }
    });                
});    

