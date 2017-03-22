var React = require("react");
var Query = require("./grandchildren/Query")

var queryURLOrigin = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=2a9034b2906e4db3978188e3cf62f890&q=";

var Search = React.createClass({
    getInitialState: function () {
        return { term: "", numRec: 5, startYear: "", endYear: "", articles: [] };
    },

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

    handleClear: function () {
        this.setState({articles: []});
    },

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

    render: function () {
        return (
            <div>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <i className="fa fa-newspaper-o"></i>
                            Search Parameters
                        </h4>
                    </div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <h4>
                                    <strong>Search Term: </strong>
                                </h4>
                                <input
                                    type="string"
                                    value={this.state.term}
                                    className="form-control"
                                    id="term"
                                    onChange={this.handleChange}
                                    required
                                />

                                <h4>
                                    <strong>Number of Records to Retrive: {this.state.numRec}</strong>
                                </h4>
                                <select value={this.state.numRec} className="form-control" id="numRec" onChange={this.handleChange}>

                                    <option value="1">1</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option></select>

                                <h4>
                                    <strong>Start Year (Optional): {this.state.startYear}</strong>
                                </h4>
                                <input
                                    type="number"
                                    value={this.state.startYear}
                                    className="form-control"
                                    id="startYear"
                                    onChange={this.handleChange}
                                />

                                <h4>
                                    <strong>End Year (Optional) : {this.state.endYear}</strong>
                                </h4>
                                <input
                                    type="number"
                                    value={this.state.endYear}
                                    className="form-control"
                                    id="endYear"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <button className="btn btn-primary btn-lg" type="button" id="button" onClick={this.handleSearch}><i className="fa fa-search"></i>Search</button>

                            <button className="btn btn-primary btn-lg" type="button" id="button" onClick={this.handleClear}><i className="fa fa-trash"></i>Clear Results</button>
                        </form>
                    </div>
                </div>
                <div className="panel panel-primary">

                    <div className="panel-heading">
                        <h3 className="panel-title">
                            <strong>
                                <i className="fa fa-table"></i>
                                Top Articles
							</strong>
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