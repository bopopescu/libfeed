var React = require('react');
var Link = require('react-router').Link;
var api = require('../api.js');

class NavBar extends React.Component {

	constructor() {
		super();
		this.state = {data: null};
	}

	componentDidMount() {
		api.getUser((err, data) => {
			if (err) console.err("[NewsFeed:componentDidMount] There's been an error retrieving data!");
			else this.setState({data: data.user});
		});
	}

	render() {
		var data = this.state.data;
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
							<li><a href="/register">{data ? null : 'Register'}</a></li>
							<li><a href="/login">{data ? null : 'Login'}</a></li>
							<li><a href="/logout">{data ? 'Logout' : null}</a></li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}

module.exports = NavBar;
