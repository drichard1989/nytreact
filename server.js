// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var logger = require("morgan");
var mongoose = require("mongoose");
mongoose.Promise = Promise;

//Requiring my schema here. 
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

//Setting a static path.
app.use(express.static(path.join((__dirname, "./public"))));

//Requiring the routes from the controllers.js file
require("./controllers/controllers.js")(app);

//Connecting to the heroku mongo db database. 
mongoose.connect("mongodb://heroku_q5x6k90x:1oa2qfn61gcrvabdtnkspconss@ds137360.mlab.com:37360/heroku_q5x6k90x");

//Creating a connection variable for mongoose for easier writing. 
var db = mongoose.connection;

//Setting up console logs for mongoose errors. 
db.on("error", function(err){
    console.log("Mongoose Error: ", err);
});
// Notifying me once the connection is successful via console log. 
db.once("open", function() {
    console.log("Mongoose connection successful!");
});

//Setting up a successful port listener console log. 
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
