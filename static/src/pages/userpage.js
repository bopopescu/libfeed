var React = require('react');
var NavBar = require('../partials/navbar.js');

class User extends React.Component {
	render() {
		return (
			<div className="user-page">
				<NavBar />
				<div className="container-fluid">
					<p>User {this.props.params.userId}</p>
				</div>
			</div>
		)
	}
}

module.exports = User;
