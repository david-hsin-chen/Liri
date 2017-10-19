var myKeys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('spotify');
var fs = require("fs");
var client = new Twitter(myKeys);



//switch format
var command = process.argv[2];
var song = process.argv[3];

switch(command){
    default:
        console.log("type out following options: my-tweets, spotify-this-song, movie-this");
        break;
    case "my-tweets": 
        showTweets(); 
        break;
    case "spotify-this-song":
        showSpotify();
        break;
    case "movie-this":
        showMovie(x);
        break;
              }


//npm install twitter
function showTweets(){
    var params = {screen_name: 'paf2200'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 20; i++){
            var tweetMsg = {
                        "Name"      : tweets[i].user.name,
                        "Created"   : tweets[i].created_at,
                        "Tweet"     : tweets[i].text
            };
                
                console.log(tweetMsg);
            }
        } else {
         console.log('thiere is an error');
        }
    });
};

//npm install spotify
function showSpotify(){

var spotify = new Spotify({
  id: '4011a7ff05e442af8f826fde23f7b01f',
  secret: 'aafa088b788c4e67b6b269b5ecb627cd'
});    
console.log(Spotify);
Spotify.search({ type: track , query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  } 
 
console.log(data); 
});