'use strict';

var React = require('react');

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
                    <a className = "btn btn-primary" href="#/Search">
                        Run Search
                    </a>
                    <a className = "btn btn-primary" href = "#/Saved">
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