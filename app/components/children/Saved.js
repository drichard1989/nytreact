var React = require("react");
var Data = require("./grandchildren/Data");


var Saved = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },

    // waiting for the page to load so it can grab the database information so it can save it in the state for the display
    componentDidMount: function () {
        $.get("/api/saved").done((result) => {
            this.setState({ data: result });
        });
    },

    //this will delete unique items in the database. 
    deleteBtn: function () {
        $.ajax({
            url: "/api/saved/" + this.props.id, type: 'DELETE', success: (result) => {
                this.setState({ data: result });
            }
        });
    },

    //this will dynamicly create the list of of saved articles from the database
    displayData: function () {
        return this.state.data.map((sArt, index) => {

            return <Data key={index} index={index} title={sArt.title} url={sArt.url} date={sArt.date} id={sArt._id} setParent={this.setParent} />
        });
    },

    //this is the call back function so it can display the new result after you delete a document
    setParent: function (data) {
        this.setState({ data: data });
    },
    //Rendering the information in the saved component. 
    render: function () {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">
                            Save Articles
                    </h3>
                </div>
                <div className="panel-body">
                    {this.displayData()}
                </div>
            </div>
        );
    }
});

module.exports = Saved;