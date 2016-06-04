var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');

var HomePage = require('./homepage.js');
var AboutPage = require('./pages/aboutpage.js');
var StudentPage = require('./pages/studentpage.js');
var BookPage = require('./pages/bookpage.js');
var NewsFeed = require('./newsfeed/newsfeed.js');
var UserPage = require('./pages/userpage.js');
var Browse = require('./pages/browse.js');
var Genre = require('./pages/genre.js');
var StudentResults = require('./pages/studentresults.js');
var BookResults = require('./pages/bookresults.js');
var AuthorResults = require('./pages/authorresults.js');

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
					<Route path="/search/student/:searchTerm" component={StudentResults} />
					<Route path="/search/book/:searchTerm" component={BookResults} />
					<Route path="/search/author/:searchTerm" component={AuthorResults} />
					<Route path="/newsfeed" component={NewsFeed} />
					<Route path="/user" component={UserPage} />
					<Route path="/browse" component={Browse} />
					<Route path="/browse/:genre" component={Genre} />
				</Router>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))
