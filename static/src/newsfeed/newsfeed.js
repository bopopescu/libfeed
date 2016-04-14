var React = require('react');
var NavBar = require('../partials/navbar.js');

class NewsFeed extends React.Component {
	render() {
		return (
			<div className="newsfeed">
				<NavBar />
				<div className="container-fluid">
					<p>News feed</p>
				</div>
			</div>
		)
	}
}

module.exports = NewsFeed;
