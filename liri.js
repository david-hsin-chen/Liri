var myKeys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

//switch format
var command = process.argv[2];
var input = process.argv[3];
var searchInput = process.argv;

for (var i = 4; i<searchInput.length; i++){
    input += '+' + searchInput[i];
}

switch(command){
    default:
        console.log("type out following options: my-tweets, spotify-this-song, movie-this, do-what-it-says");
        break;
    case "my-tweets": 
        showTweets(); 
        break;
    case "spotify-this-song":
        showSpotify(input);
        break;
    case "movie-this":
        showMovie(input);
        break;
    case 'do-what-it-says':
        showThis();
        break;
              };


//npm install twitter
function showTweets(){
    var params = {screen_name: 'paf2200', count:20};
    var client = new Twitter({
        consumer_key: myKeys.twitter.consumer_key,
        consumer_secret: myKeys.twitter.consumer_secret,
        access_token_key: myKeys.twitter.access_token_key,
        access_token_secret: myKeys.twitter.access_token_secret
    });
    /*    var client = new Twitter(myKeys.twitter)*/
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i=0; i < tweets.length; i++) {
                console.log(
                    "------------------------------------\n"+
                    tweets[i].user.name +"\n"+ tweets[i].created_at +"\n"+ tweets[i].text + "\n------------------------------------");
            }
        }
        else {
            console.log('thiere is an error: ' + error);
        }
    });
};
//npm install spotify
function showSpotify(input){
    var mySpot = new Spotify({
        id: myKeys.spotify.id,
        secret: myKeys.spotify.secret
    });
   
    if(!input){
        input = "hello";
    } 
    mySpot.search({type: 'track', query: input, limit:5}, function (err, data) {
        if (err) {
            console.log("There is an error: " + err);
        } else {
            for(var i = 0; i < data.tracks.items.length; i++){
                var datae = data.tracks.items[i];
                console.log("Artist: " + datae.artists[0].name);
                console.log("Song: " + datae.name);
                console.log("Preview URL: " + datae.preview_url);
                console.log("Album: " + datae.album.name);
                console.log("-----------------------");
                
                fs.appendFile('log.txt', input);
                fs.appendFile('log.txt', datae.artists[0].name);
                fs.appendFile('log.txt', datae.name);
                fs.appendFile('log.txt', datae.preview_url);
                fs.appendFile('log.txt', datae.album.name);
            }
        };
    });
};


function showMovie(input){
    var moviekey = "40e9cece";
    if(!input) {
        input = "Mr. Nobody";
    } 
    var omdbURL = 'http://www.omdbapi.com/?apikey='+moviekey+'&t=' + input + '&plot=short&tomatoes=true';
/*http://www.omdbapi.com/?apikey=40e9cece&t=stars+war&plot=short&tomatoes=true*/
   
    request(omdbURL, function (error, response, body){
        if(!error && response.statusCode == 200){
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
            
            fs.appendFile("log.txt", body.Title);
            fs.appendFile("log.txt", body.Year);
            fs.appendFile("log.txt", body.imdbRating);
            fs.appendFile("log.txt", body.Country);
            fs.appendFile("log.txt", body.Language);
            fs.appendFile("log.txt", body.Actors);
            fs.appendFile("log.txt", body.tomatoRating);
            fs.appendFile("log.txt", body.tomatoURL);
        } else {
            console.log(error)
        }
    });
};    

function showThis() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var dataArr = data.split(',');
            if (dataArr[0] === 'spotify-this-song') {
               showSpotify(dataArr[1]);
            }
            if (dataArr[0] === 'movie-this') {
                showMovie(dataArr[1]);
            }
        }
    });
}