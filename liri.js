var fs = require('fs');
var command=process.argv[2];
var query=process.argv[3];
var allowedCommands=["spotify-this-song","movie-this","my-tweets","do-what-it-says"];

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
    var params = {screen_name: 'DavidSpeak', count:21};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        fs.appendFile('log.txt', 'Twitter-Query: '+'\n', function(err){
            if(err){
              console.log(err);
            }
        });
      	for (var i = 0; i<tweets.length; i++) {
      		console.log('Date tweeted: '+tweets[i].created_at+'\nTweet: '+tweets[i].text+'\n');
          fs.appendFile('log.txt', 'Date tweeted: '+tweets[i].created_at+'\nTweet: '+tweets[i].text+'\n\n',
            function(err){
              if(err){
                console.log(err);
              }
            }
          );
      	}
        fs.appendFile('log.txt', '-----------------------------------------------------------------------------------------------twitter\n\n',
            function(err){
              if(err){
                console.log(err);
              }
        });
      } else {
          console.log('Twitter Error: '+ error);
          fs.appendFile('log.txt', 'unknown twitter error: '+error+'\n'+
                                  '-----------------------------------------------------------------------------------------------twitter\n\n',
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
        }
        if (data.tracks.items[0]!=undefined){
          console.log('Artist: '+data.tracks.items[0].artists[0].name);
          console.log('Song Name: '+data.tracks.items[0].name);
          console.log('Preview URL: '+data.tracks.items[0].preview_url);
          console.log('Album Name: '+data.tracks.items[0].album.name);
          fs.appendFile('log.txt', 'Spotify-Query: '+query+'\n'+
                                  'Artist: '+data.tracks.items[0].artists[0].name+'\n'+
                                  'Song Name: '+data.tracks.items[0].name+'\n'+
                                  'Preview URL: '+data.tracks.items[0].preview_url+'\n'+
                                  'Album Name: '+data.tracks.items[0].album.name+'\n'+
                                  '-----------------------------------------------------------------------------------------------spotify\n\n',
            function(err){
              if(err){
                console.log(err);
              }
          });
        }else {
          console.log('Looks like Spotify can\'t find that title, try an alternate spelling.');
          fs.appendFile('log.txt', 'Spotify-Query: '+query+'\n'+
                                  'Spotify couldn\'t find that search query.\n'+
                                  '-----------------------------------------------------------------------------------------------spotify\n\n',
              function(err){
                if(err){
                  console.log(err);
                }
          });
        }
    });
  },
  'movie-this':function(){
    var request = require('request');
    request('http://www.omdbapi.com/?t='+query+'&plot=full&tomatoes=true&r=json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data=JSON.parse(body);
        if (data.Title!=undefined){
          console.log('Title: '+data.Title);
          console.log('Release Year: '+data.Year);
          console.log('IMDB Rating: '+data.imdbRating);
          console.log('Country: '+data.Country);
          console.log('Language: '+data.Language);
          console.log('Plot Synopsis: '+data.Plot);
          console.log('Actors: '+data.Actors);
          console.log('Rotten Tomatoes Rating: '+data.tomatoRating);
          console.log('Rotten Tomatoes URL: '+data.tomatoURL);
          fs.appendFile('log.txt', 'Movie-Query: '+query+'\n'+
                                  'Title: '+data.Title+'\n'+
                                  'Release Year: '+data.Year+'\n'+
                                  'IMDB Rating: '+data.imdbRating+'\n'+
                                  'Country: '+data.Country+'\n'+
                                  'Language: '+data.Language+'\n'+
                                  'Plot Synopsis: '+data.Plot+'\n'+
                                  'Actors: '+data.Actors+'\n'+
                                  'Rotten Tomatoes Rating: '+data.tomatoRating+'\n'+
                                  'Rotten Tomatoes URL: '+data.tomatoURL+'\n'+
                                  '-----------------------------------------------------------------------------------------------IMDB\n\n',
                                  function(err){
              if(err){
                console.log(err);
              }
          });
        }else {
          console.log('Looks like IMDB can\'t find that title, try an alternate spelling');
          fs.appendFile('log.txt', 'Movie-Query: '+query+'\n'+
                                  'IMDB couldn\'t find that search query.\n'+
                                  '-----------------------------------------------------------------------------------------------IMDB\n\n',
                                  function(err){
              if(err){
                console.log(err);
              }
          });
        }
      }
    });
  },
  'do-what-it-says':function(){
    var fs = require('fs');
    fs.readFile("random.txt", "utf8", function(error, data) {
      var dataArr = data.split(',');
      command=dataArr[0];
      query=dataArr[1];
      fs.appendFile('log.txt', 'predefined task\n'+
                              'next command requested in \'random.txt\'\n\n',
                              function(err){
          if(err){
            console.log(err);
          }
      });
      commands[command]();
    });
  }
}

if (allowedCommands.indexOf(command)!=-1){
  if (command==="spotify-this-song" &&query===undefined){query="The Sign Ace of Base"};
  if (command==="movie-this" && query===undefined){query="Mr. Nobody"};
  commands[command]();
}else {
  console.log('Sorry, I don\'t recognize that command!');
  fs.appendFile('log.txt', 'Undefined-command: '+command+'\n'+
                          'query: '+query+'\n'+    
                          '-----------------------------------------------------------------------------------------------Undefined\n\n',
                          function(err){
      if(err){
        console.log(err);
      }
  });
}