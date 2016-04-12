var React = require('react');
var Link = require('react-router').Link;
var stormpath = require('react-stormpath');
var NotAuthenticated = stormpath.NotAuthenticated;
var Authenticated = stormpath.Authenticated;

class NavBar extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="/">LibFeed</a>
					</div>
					<div className="collapse navbar-collapse" id="navbar-collapse">
						<ul className="nav navbar-nav navbar-right">
							<li><Link to="/about">About</Link></li>
							<li><NotAuthenticated><Link to="/login">Log In</Link></NotAuthenticated></li>
							<li><NotAuthenticated><Link to="/signup">Sign Up</Link></NotAuthenticated></li>
							<li><Authenticated><Link to="/newsfeed">Newsfeed</Link></Authenticated></li>
							<li><Authenticated><Link to="/logout">Log Out</Link></Authenticated></li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}

module.exports = NavBar;
