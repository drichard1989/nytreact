//Requring the react library.
var React = require("react");

// Creating our Query component with functions to be run later. 
var Query = React.createClass({
    //Here, we are creating a function that will fire when the button is clicked to save the article, 
    saveBtn: function () {
        var obj = {
            title: this.props.title,
            url: this.props.url,
            date: this.props.date
        };

        $.post("/api/saved", obj);
        $("#" + this.props.index).empty();
    },
    //Rendering our Query component (panel bodies to be saved or not saved.)
    render: function() {
        return (
            <div id={this.props.index}>
                <div className = "panel-body">
                        <a href = {this.props.url}><h3>
                                {this.props.title}
                        </h3>
                        </a>

                        <h5>
                            {this.props.date}
                        </h5>

                        <button className = "saveBtn btn btn-primary btn-lg"
                                id="button"
                                data-title = {this.props.title}
                                data-date = {this.props.date}
                                data-url = {this.props.url}
                                data-id = {this.props.index}
                                onClick = {this.saveBtn}>
                            Save
                        </button>
                        <hr>
                        </hr>
                </div>
            </div>
        );
    }
});

//Exporting for other use. 
module.exports = Query;