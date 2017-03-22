//Requring react, react-router, route, router, hashHistory, Indexroute, and our components. 
var React = require("react");
var router = require("react-router");
var Route = router.Route;
var Router = router.Router;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;

var Main = require("../components/Main");
var Search = require("../components/children/Search");
var Saved = require("../components/children/Saved");

//Setting up which file will load on what route for non refreshing html. If path is /, then main will be served. If path is search, then search component will be served. If path is saved, then saved will be served. The default will be search as per line 20. 
module.exports = (
    <Router history = { hashHistory } >
        <Route path="/" component={Main}>
            <Route path="Search" component={Search} />
            <Route path="Saved" component={Saved} />

            <IndexRoute component={Search}/>
        </Route>
    </Router>
);