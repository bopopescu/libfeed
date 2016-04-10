// splash.js

var React = require('react');
var NavBar = require('./partials/navbar.js');

class Home extends React.Component {
	render() {
		return (
			<div className="home-page">
				<NavBar />
				<div className="container-fluid">
					<p>Home</p>
				</div>
			</div>
		)
	}
}

module.exports = Home;
