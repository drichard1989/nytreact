'use strict';
//Requring the react library. 
var React = require('react');

//Creating a component class named Main where we will allow our children components to be inserted in a div tag below. 
var Main = React.createClass({
    render: function() {
        return (
            <div className = "container">
                <div className="jumbotron">
                    <h1>
                        Search the New York Times
                    </h1>
                    <small> Here, you can search the New York Times, save articles, and delete them. This application was built using React, so the page does not refresh.</small>
                    <br></br>
                    <hr></hr>
                    <a className = "btn btn-primary" id="button" href="#/Search">
                        Search
                    </a>
                    <a className = "btn btn-primary" id="button" href = "#/Saved">
                        Saved
                    </a>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
});

module.exports = Main;