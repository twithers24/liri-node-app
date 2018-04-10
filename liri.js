require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require('spotify-web-api-js');
var request = require("request");
var twitterKeys = require('./keys.js');
var fs = require("fs");
var http = require("http");
var userInput = process.argv[2];
var argument = "";

//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);

function inputData(){
    if(userInput === "my-tweets"){
        showTweets();
    };
    if(userInput === "spotify-this-song"){
        spotifySong();
    };
    if(userInput === "movie-this"){
        movieInfo();
    };
    if(userInput === "do-what-it-says"){
        doWhatItSays();
    };
}
//Twitter Function_______________________________________________________________________________
function showTweets(){
    var client = new Twitter(twitterKeys.twitter);
    var screenName = {screen_name: "Michael16465390"};
    client.get('statuses/user_timeline', screenName, function(error, tweets, response){
      if(!error){
        for(var i = 0; i<tweets.length; i++){
          var date = tweets[i].created_at;
          console.log("@Michael16465390: " + tweets[i].text + " Created At: " + date.substring(0, 19));
          console.log("____________________________________");
        }
      }else{
        console.log('Error occurred');
      }
    });
  }
  showTweets();
//Spotify Function_______________________________________________________________________________________
  function spotifySong(song){
    var songName = process.argv[3];
    if(songName === " "){
        songName = "The Sign"; 
     }
    Spotify.search({ type: 'track', query: song}, function(error, data){
      if(!error){
        for(var i = 0; i < data.tracks.items.length; i++){
            var songInfo = data.tracks.items[i];
            console.log("Artist: " + songInfo.artists[0].name);
            console.log("Song: " + songInfo.name);
            console.log("Preview URL: " + songInfo.preview_url);
            console.log("Album: " + songInfo.album.name)
        }
    } else{
        console.log("Error Occurred");
    }    
    })
};
//OMDB function______________________________________________________________________________________________________
  function movieInfo(movieTitle){
    var movieTitle = process.argv[3];
    if(!movieTitle){
        movieTitle = "mr nobody";
    }
  request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
    if (!error && response.statusCode === 200) {
        var body = JSON.parse(body);
        console.log("Title: " + body.Title);
        console.log("Release Year: " + body.Year);
        console.log("IMdB Rating: " + body.imdbRating);
        console.log("Country: " + body.Country);
        console.log("Language: " + body.Language);
        console.log("Plot: " + body.Plot);
        console.log("Actors: " + body.Actors);
        console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
        console.log("Rotten Tomatoes URL: " + body.tomatoURL);
      }else {
          console.log("An Error Occurred");
      }
    }) 
  }
  //Do What It Says_________________________________________________________________________
  function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (!error) {
            doWhatItSaysResults = data.split(",");
            spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
        } else {
            console.log("Error occurred" + error);
        }
    });
};      
     