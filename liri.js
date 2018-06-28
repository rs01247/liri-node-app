require("dotenv").config();

const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const fs = require("fs");

const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);


