var React = require('react');

class User extends React.Component {
	render() {
		return (
			<div className="user-page">
				<div className="container-fluid">
					<p>User {this.props.params.userId}</p>
				</div>
			</div>
		)
	}
}

module.exports = User;
