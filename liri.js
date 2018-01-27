
    var inputString = process.argv;

    var cmdinstr = inputString[2];
    var num1 = inputString[3];  
    var num2 = inputString[4];
    var fs = require('fs'); 


        var tweets = ""
        var username ="Ace7314"

        var artist = ""
        var songname = ""
        var link = ""
        var album = ""

        var title = ""
        var year = 0
        var imdbRating = 0
        var country = ""
        var language = ""
        var plot = ""
        var actors = ""
        var rottenRating = ""
        var rotUrl = ""



function spotify() {
        console.log("SPOTIFY-test")
        var SpotifyWebApi = require('spotify-web-api-node');
        var spotifyApi = new SpotifyWebApi();
        spotifyApi.searchTracks('Love', function(err, data) {
          if (err) {
            console.error('Something went wrong', err.message);
            return;
          }

          console.log('I got ' + data.body.tracks.total + ' results!');

         
          var firstPage = data.body.tracks.items;
          console.log('The tracks in the first page are.. (popularity in parentheses)');

          firstPage.forEach(function(track, index) {
            console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
          });
        });
         
}

if (cmdinstr == "my-tweets") {
    
    var twitterKeys = require('./keys.js');

        var Twitter = require('twitter');
 
            var client = new Twitter({
                
            consumer_key: 'D9STMlH7mgNvV31FRkvAXiZjg',
            consumer_secret: 'beoo5mI0Z2UysouMspK4omFMmtEfTebGdFJc2F2IPfoLLrTiyZ',
            access_token_key: '957081935678930944-BJJvD9PPXIIUekMuL4xcUoy65dM3RMq',
            access_token_secret: 'C2GFUocZ9Dt9zmzcFkACpn8QdNSHcQNJGgwFWoHB6EC7n'
            });
 
            var params = {screen_name: 'Ace7314'};

            
            client.get('favorites/list', params, function(error, tweets, response){
              if(error) throw error;
            });

            client.get('statuses/user_timeline', params, function(error, tweets, response){
              if (!error) {
                // console.log(tweets);
                console.log(JSON.parse(response.body));
                
              } else {
                console.log("error");
              }
            });
        fs.writeFile("log.txt", cmdinstr, function(err) {
            if(err) {
                return console.log(err);
            }
        
        }); 
        

} else if (cmdinstr == "spotify-this-song") {
    spotify();

   
        fs.writeFile("log.txt", cmdinstr, function(err) {
        
            if(err) {
                return console.log(err);
            }
        }); 
        

} else if (cmdinstr == "movie-this") {
    var request = require('request');
    var nodeArgs = process.argv[3];
    var movieName = "";

   
    for (var i=3; i<nodeArgs.length; i++){
        if (i>3 && i< nodeArgs.length){
            movieName = movieName + "+" + nodeArgs[i];
        }
        else {
            movieName = movieName + nodeArgs[i];
        }
    }
    if (movieName !== "") {
        var queryUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=9342baf6' + movieName +'&y=&plot=short&r=json&tomatoes=true';
        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // function parseMovie () {
                console.log("Title: " + JSON.parse(body)["Title"])
                console.log("Release Year: " + JSON.parse(body)["Year"])
                console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"])
                console.log("Country: " + JSON.parse(body)["Country"])
                console.log("Language: " + JSON.parse(body)["Language"])
                console.log("Plot: " + JSON.parse(body)["Plot"])
                console.log("Actors: " + JSON.parse(body)["Actors"])
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"])
                console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"])
            }
        });
    }
    else {
        movieName = "Mr. Nobody";
        var queryUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=9342baf6' + movieName +'&y=&plot=short&r=json&tomatoes=true';
        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Title: " + JSON.parse(body)["Title"])
                console.log("Release Year: " + JSON.parse(body)["Year"])
                console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"])
                console.log("Country: " + JSON.parse(body)["Country"])
                console.log("Language: " + JSON.parse(body)["Language"])
                console.log("Plot: " + JSON.parse(body)["Plot"])
                console.log("Actors: " + JSON.parse(body)["Actors"])
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"])
                console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"])
                
            }
        });
    }
        fs.writeFile("log.txt", cmdinstr, function(err) {
        
            if(err) {
                return console.log(err);
            }  
        }); 
} else if (cmdinstr == "do-what-it-says") {
    var fs = require('fs');

    fs.readFile("random.txt", "utf8", function(error, data) {  
        console.log(data);

        var dataArr = data.split(',');
        cmdinstr = dataArr[0];

        if (cmdinstr == "my-tweets") {
            console.log("TWEETS")
        }
        else if (cmdinstr == "spotify-this-song") {
     
            console.log("SPOTIFY")
        }
        else if (cmdinstr == "movie-this") {
          
            console.log("MOVIE")
        }
        else if (cmdinstr == "do-what-it-says") {
            console.log("--------------------------");
            console.log("random.txt file contains 'do-what-it-says' which will create an infinite loop.  \nPlease remove 'do-what-it-says from the random.txt file.");
        }
        else {
            console.log("--------------------------");
            console.log("Command in random.txt not recognized.\nPlease enter one of the following commands in random.txt:\n  my-tweets\n  spotify-this-song,'song name'\n  movie-this,'movie name'");
        }
    });      
        fs.writeFile("log.txt", cmdinstr, function(err) {
            if(err) {
                return console.log(err);
            }
            
        });      
} 
else {
    console.log("--------------------------");
    console.log("Command not recognized.\nPlease enter one of the following commands:\n  my-tweets\n  spotify-this-song 'song name'\n  movie-this 'movie name'\n  do-what-it-says");

    
        fs.writeFile("log.txt", cmdinstr, function(err) {
            if(err) {
                return console.log(err);
            }
          
        }); 
}