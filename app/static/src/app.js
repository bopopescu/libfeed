var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');

var HomePage = require('./homepage.js');
var AboutPage = require('./pages/aboutpage.js');
var StudentPage = require('./pages/studentpage.js');
var BookPage = require('./pages/bookpage.js');
var NewsFeed = require('./newsfeed/newsfeed.js');
var SearchResults = require('./pages/searchresults.js');

var Router = router.Router;
var Route = router.Route;
var browserHistory = router.browserHistory;

class App extends React.Component {
	render() {
		return (
			<div>
				<Router history={browserHistory} >
					<Route path="/" component={HomePage}/>
					<Route path="/about" title="About" component={AboutPage} />
					<Route path="/students/:studentId" component={StudentPage} />
					<Route path="/books/:bookIsbn" component={BookPage} />
					<Route path="/search/:searchTerm" component={SearchResults} />
					<Route path="/newsfeed" component={NewsFeed} />
				</Router>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))
