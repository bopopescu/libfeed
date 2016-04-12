var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var stormpath = require('react-stormpath');

var HomePage = require('./homepage.js');
var AboutPage = require('./pages/aboutpage.js');
var UserPage = require('./pages/userpage.js');
var LoginPage = require('./pages/loginpage.js');
var SignUpPage = require('./pages/signuppage.js');
var NewsFeed = require('./newsfeed/newsfeed.js');

var Router = router.Router;
var Route = router.Route;
var browserHistory = router.browserHistory;
var LoginRoute = stormpath.LoginRoute;
var LogoutRoute = stormpath.LogoutRoute;
var AuthenticatedRoute = stormpath.AuthenticatedRoute;

class App extends React.Component {
	render() {
		return (
			<div>
				<Router history={browserHistory} >
					<Route path="/" component={HomePage}/>
					<Route path="/about" title="About" component={AboutPage} />
					<LoginRoute path="/login" title="Login" component={LoginPage} />
					<LogoutRoute path='/logout' />
					<Route path="/signup" title="Sign Up" component={SignUpPage} />
					<Route path="/users/:userId" component={UserPage} />
					<AuthenticatedRoute path="/newsfeed" component={NewsFeed} />

				</Router>
			</div>
		)
	}
}

stormpath.init();

ReactDOM.render(<App />, document.getElementById('app'))
