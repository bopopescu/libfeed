var React = require('react');
var NavBar = require('../partials/navbar.js');

class About extends React.Component {
	render() {
		return (
			<div className="about-page">
				<NavBar />
				<div className="container-fluid">
					<p>About</p>
				</div>
			</div>
		)
	}
}

module.exports = About;
