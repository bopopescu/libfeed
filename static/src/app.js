var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');

var HomePage = require('./homepage.js');
var AboutPage = require('./pages/aboutpage.js');
var UserPage = require('./pages/userpage.js');
var BookPage = require('./pages/bookpage.js');
var LibraryPage = require('./pages/librarypage.js');
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
					<Route path="/users/:userId" component={UserPage} />
					<Route path="/books/:bookIsbn" component={BookPage} />
					<Route path="/libraries/:libraryId" component={LibraryPage} />
					<Route path="/search/:searchTerm" component={SearchResults} />
					<Route path="/newsfeed" component={NewsFeed} />
				</Router>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))
