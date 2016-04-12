import { LoginForm } from 'react-stormpath';

var React = require('react');
var NavBar = require('../partials/navbar.js');

class Login extends React.Component {
	render() {
		return (
			<div className="login-page">
				<NavBar />
				<div className="container-fluid">
					<p>Login</p>
					<LoginForm redirectTo="/newsfed" />
				</div>
			</div>
		)
	}
}

module.exports = Login;
