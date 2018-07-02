require("dotenv").config();

const keys = require("./keys.js");
const request = require("request");
const axios = require("axios");
const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const fs = require("fs");
const arg1 = process.argv[2]
const arg2 = process.argv[3]
const search = process.argv.slice(3).join(" ");

// API CALL FOR TWITTER
function runTwitter() {
    const client = new Twitter(keys.twitter);

    // USING PROCESS.ARGV[3] TO SPECIFY WHICH TWITTER FEED YOU ARE SEARCHING FOR
    const params = { screen_name: `${arg2}` };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(`
${tweets[0].user.name}
Followers: ${tweets[0].user.followers_count}
Friends: ${tweets[0].user.friends_count}
            `);
            for (var i = 0; i < tweets.length; i++) {
                console.log(`
---------------------------------------------------
${tweets[i].created_at}
${tweets[i].text}
---------------------------------------------------
                `)
            }
        }
    });
};

// API CALL FOR SPOFITY 
function runSpotify() {
    const spotify = new Spotify(keys.spotify);
    // ALLOWS USER TO TYPE IN THE SONG NAME WITH SPACES 
    spotify.search({ type: 'track', query: search }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        const whatSong = data.tracks.items
        for (var i = 0; i < 5; i++) {
            const spotifyData = console.log(`
--------------------------------------------------- 
Artist: ${whatSong[i].artists[0].name}
Song: ${whatSong[i].name}
Album: ${whatSong[i].album.name}
Release: ${whatSong[i].album.release_date}
Preview: ${whatSong[i].preview_url}
---------------------------------------------------
            `)
        }
    });
};

// API CALL FOR OMDB
function runOMDB() {
    const URL = `https://www.omdbapi.com/?t=${search}&y=&plot=short&apikey=trilogy`
    axios.get(URL)
        .then(function (resp) {
            const results = resp.data
            // console.log(resp.data);
            console.log(`
Title: ${results.Title}
Year: ${results.Year}
IMDB Rating: ${results.Ratings[0].Value}
Rotten Tomatoes: ${results.Ratings[1].Value}
Country: ${results.Country}
Language: ${results.Language}
Plot: ${results.Plot}
Actors: ${results.Actors}
        `);
        })
        .catch(function (resp) {
            console.log(error);
        })
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        const textData = data.split(",");
        console.log(textData);
    });
};


function logBox() {
    fs.appendFile("log.txt", showData + divider, function (err) {
        if (err) throw err;
        console.log(showData);
    });
}

// RUN FUNCTIONS OFF OF USER INPUT
if (arg1 === "tweets") {
    runTwitter();
}

if (arg1 === "spotify") {
    runSpotify();
}

if (arg1 === "movie") {
    runOMDB();
}

if (arg1 === "do") {
    doWhatItSays();
}