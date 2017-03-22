// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var logger = require("morgan");
var mongoose = require("mongoose");
mongoose.Promise = Promise;
//Need to require my schema here. 
var Article = require("./models/Article");
//Create an instance of express
var app = express();
//Sets an initial port. We'll use this later in our listener.
var PORT = process.env.PORT || 3000;


// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(path.join((__dirname, "./public"))));
//setting up the routes from the controllers.js
require("./controllers/controllers.js")(app);

//If heroku mongoose database available, use that. if not, use the local db named ntyreact
mongoose.connect("mongodb://heroku_q5x6k90x:1oa2qfn61gcrvabdtnkspconss@ds137360.mlab.com:37360/heroku_q5x6k90x");

var db = mongoose.connection;

db.on("error", function(err){
    console.log("Mongoose Error: ", err);
});

db.once("open", function() {
    console.log("Mongoose connection successful!");
});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
