var React = require('react');
var api = require('../api.js');

class User extends React.Component {

	constructor() {
		super();
		this.state = {data: null};
	}

	componentDidMount() {
		api.getUser(this.props.params.userId, (err, data) => {
			if (err) console.err("[UserPage:componentDidMount] There's been an error retrieving data!");
			else this.setState({data: data.user});
		});
	}

	render() {
		var data = this.state.data;
		return (
			<div className="user-page">
				<div className="container-fluid">
					<p>User: {data}</p>
				</div>
			</div>
		)
	}
}


module.exports = User;
