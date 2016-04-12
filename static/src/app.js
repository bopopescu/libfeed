var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');

var HomePage = require('./homepage.js');
var AboutPage = require('./pages/aboutpage.js');
var UserPage = require('./pages/userpage.js');

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
					<Route path="/login" title="Login" component={LoginPage} />
					<Route path="/users/:userId" component={UserPage} />
				</Router>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))
