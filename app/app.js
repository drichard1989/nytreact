//Requring React and ReactDom
var React = require("react");
var ReactDOM = require("react-dom");

//Requring our routes folder
var routes = require("./config/routes");

//Serving up our app components using the routes we created in the routes folder. 
ReactDOM.render(routes, document.getElementById("app"));