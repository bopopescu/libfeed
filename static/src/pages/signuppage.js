var React = require('react');
var NavBar = require('../partials/navbar.js');
var stormpath = require('react-stormpath');

var RegistrationForm = stormpath.RegistrationForm;

class SignUp extends React.Component {
	render() {
		return (
			<div className="signup-page">
				<NavBar />
				<div className="container-fluid">
					<p>Sign Up</p>
                    <RegistrationForm />
				</div>
			</div>
		)
	}
}

module.exports = SignUp;
