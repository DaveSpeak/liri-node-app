Application needs node.js - see https://nodejs.org/en/download/
Run 'npm install' from the command line in the directory where liri.js is installed,
and the package.json file will create the npm libraries needed to run liri.
Liri has four commands: my-tweets, spotify-this-song, movie-this, do-what-it-says

Commands are issued like this (example for calling a request to spotify for 'Day Tripper' by the Beatles): 
node liri.js spotify-this-song 'Day Tripper'
(the default song request if none is given is 'I Want it That Way' by the Backstreet Boys)

For movie requests:
node liri.js movie-this 'The Terminator'
(the default movie title if none is given is 'Mr. Nobody')

For the last twenty tweets from a specified user:
node liri.js my-tweets "<username>" 
(note the default username is 'davidspeak')

A file 'random.txt' has a single command line which is executed as follows:
node liri.js do-what-it-says
(the default case is a call to spotify for 'The Sign' by Ace of Base)