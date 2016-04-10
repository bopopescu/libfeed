var React = require('react');
var Link = require('react-router').Link;

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
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}

module.exports = NavBar;
