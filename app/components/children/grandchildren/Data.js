var React = require("react");

//Creating a component for our saved data. 
var Query = React.createClass({
    //Creating a function when a user clicks the delete button in the saved articles section. 
    deleteBtn: function() {
        $.ajax({url: "/api/saved/" + this.props.id, type: "DELETE", success: (result) => {
            if (result) {
                $.get("/api/saved").done((data) => {
                    this.props.setParent(data);
                });
            }
        }})
    },
    // Rendering the saved articles for the user
    render: function() {
        return (
            <div className = "panel-body">
                    <a href = {this.props.url}><h3>
                            {this.props.title}
                    </h3>
                    </a>
                    <h5>
                        {this.props.date}
                    </h5>


                    <button className="saveBtn btn btn-primary btn-lg"
									id="button"
                                    data-title={this.props.title}
									data-date={this.props.date}
									data-url={this.props.url}
									data-id={this.props.id}
									onClick={this.deleteBtn}>
						Delete
					</button>
                    <hr>
                    </hr>
            </div>
        );
    }
});

module.exports = Query;