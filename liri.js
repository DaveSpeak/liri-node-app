var fs = require('fs');
var command=process.argv[2];
var query=process.argv[3];
if (query===null){query="The Sign"};
var commands= {
  'my-tweets': function(){
    var keys = require('./keys.js');
    var consumer_key = keys.twitterKeys.consumer_key;
    var consumer_secret = keys.twitterKeys.consumer_secret;
    var access_token_key = keys.twitterKeys.access_token_key;
    var access_token_secret = keys.twitterKeys.access_token_secret;
    var Twitter = require('twitter');
    var client = new Twitter({
      consumer_key: consumer_key,
      consumer_secret: consumer_secret,
      access_token_key: access_token_key,
      access_token_secret: access_token_secret
    });
    var params = {screen_name: 'DavidSpeak'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        fs.appendFile('log.txt', 'Twitter-Query: '+'\n', function(err){
            if(err){
              console.log(err);
            }
        });
      	for (var i = 0; i<tweets.length; i++) {
      		console.log('tweeted: '+tweets[i].created_at+'\ntweet: '+tweets[i].text);
          fs.appendFile('log.txt', 'tweeted: '+tweets[i].created_at+'\ntweet: '+tweets[i].text+'\n', function(err){
              if(err){
                console.log(err);
              }
          });
      	}
        fs.appendFile('log.txt', '-----------------------------------------------------------------------------------------------\n\n',
            function(err){
            if(err){
              console.log(err);
            }
        });
      }
    });
  },
  'spotify-this-song':function(){
    var spotify = require('spotify');
    spotify.search({ type: 'track', query: query }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url);
        console.log(data.tracks.items[0].album.name);
        fs.appendFile('log.txt', 'Spotify-Query: '+query+'\n'+
                                data.tracks.items[0].artists[0].name+'\n'+
                                data.tracks.items[0].name+'\n'+
                                data.tracks.items[0].preview_url+'\n'+
                                data.tracks.items[0].album.name+'\n'+
                                '-----------------------------------------------------------------------------------------------\n\n',
                                function(err){
            if(err){
              console.log(err);
            }
        });
    });
  },
  'movie-this':function(){
    var request = require('request');
    request('http://www.omdbapi.com/?t='+query+'&plot=full&tomatoes=true&r=json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data=JSON.parse(body);
        console.log(data.Title);
        console.log(data.Year);
        console.log(data.imdbRating);
        console.log(data.Country);
        console.log(data.Language);
        console.log(data.Plot);
        console.log(data.Actors);
        console.log(data.tomatoRating);
        console.log(data.tomatoURL);
        fs.appendFile('log.txt', 'Movie-Query: '+query+'\n'+
                                data.Title+'\n'+
                                data.Year+'\n'+
                                data.imdbRating+'\n'+
                                data.Country+'\n'+
                                data.Language+'\n'+
                                data.Plot+'\n'+
                                data.Actors+'\n'+
                                data.tomatoRating+'\n'+
                                data.tomatoURL+'\n'+
                                '-----------------------------------------------------------------------------------------------\n\n',
                                function(err){
            if(err){
              console.log(err);
            }
        });
      }
    });
  },
  'do-what-it-says':function(){
    var fs = require('fs');
    fs.readFile("random.txt", "utf8", function(error, data) {
      var dataArr = data.split(',');
      command=dataArr[0];
      query=dataArr[1];
      commands[command]();
    });
  }
}
commands[command]();
