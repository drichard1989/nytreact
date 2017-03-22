//Requiring react and the grandchild component Query
var React = require("react");
var Query = require("./grandchildren/Query")

// Creating a variable for the NYT api key I signed up for, so that we can run searches. 
var queryURLOrigin = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=2a9034b2906e4db3978188e3cf62f890&q=";

//Creating a Search component using es5, writing various functions that we will call later on in the component. 
var Search = React.createClass({
    //setting initial states to be changed later, which is for the form field for the search. 
    getInitialState: function () {
        return { term: "", numRec: 5, startYear: "", endYear: "", articles: [] };
    },

    //Returning the Query information from the Query component to the parent element to be used. 
    displayResult: function () {
        return this.state.articles.map(function (article, index) {
            return <Query key={index} index={index} title={article.headline.main} url={article.web_url} date={article.pub_date} />
        });
    },


    handleChange: function (change) {
        var newState = {};
        newState[change.target.id] = change.target.value;
        this.setState(newState);
    },

    //Will clear the articles array when called. 
    handleClear: function () {
        this.setState({articles: []});
    },

    //This will allow us to take the url and make the ajax request with it , and return the data back to the dom. 
    handleSearch: function () {
        var url = queryURLOrigin + this.state.term;

        if (this.state.startYear) {
            url = url + "&begin_date=" + this.state.startYear + "0101";
        }
        if (this.state.endYear) {
            url = url + "&end_date=" + this.state.endYear + "0101";
        }


        if (this.state.term) {
            $.ajax({ url: url, method: "GET" }).done((TimesInfo) => {
                var sortedNews = [];
                for (var i = 0; i < this.state.numRec; i++) {
                    sortedNews.push(TimesInfo.response.docs[i]);
                }

                this.setState({ articles: sortedNews });
            });
        }
    },

    //Rendering our Search component. Setting up the buttons to perform functions on buttonclicks. 
    render: function () {
        return (
            <div>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            Search Parameters
                        </h4>
                    </div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <h4>Search Term: 
                                </h4>
                                <input
                                    type="string"
                                    value={this.state.term}
                                    className="form-control"
                                    id="term"
                                    onChange={this.handleChange}
                                    required
                                />

                                <h4>Number of Records to Retrive: {this.state.numRec}
                                </h4>
                                <select value={this.state.numRec} className="form-control" id="numRec" onChange={this.handleChange}>

                                    <option value="1">1</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option></select>

                                <h4>
                                    Start Year (Optional): {this.state.startYear}
                                </h4>
                                <input
                                    type="number"
                                    value={this.state.startYear}
                                    className="form-control"
                                    id="startYear"
                                    onChange={this.handleChange}
                                />

                                <h4>
                                    End Year (Optional) : {this.state.endYear}
                                </h4>
                                <input
                                    type="number"
                                    value={this.state.endYear}
                                    className="form-control"
                                    id="endYear"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <button className="btn btn-primary btn-lg" type="button" id="button" onClick={this.handleSearch}>Search</button>

                            <button className="btn btn-primary btn-lg" type="button" id="button" onClick={this.handleClear}>Clear Results</button>
                        </form>
                    </div>
                </div>
                <div className="panel panel-primary">

                    <div className="panel-heading">
                        <h3 className="panel-title">
                                Top Articles
                        </h3>
                    </div>
                    <div className="panel-body">
                        {/* this is where i dynamicly create the query results */}
                        {this.displayResult()}
                    </div>




                </div>
            </div>

        );
    }
});

module.exports = Search;