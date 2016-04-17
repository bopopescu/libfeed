var React = require('react');
var NavBar = require('../partials/navbar.js');
var api = require('../api.js');

class NewsFeed extends React.Component {

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
			<div className="newsfeed">
				<NavBar />
				<div className="container-fluid">
					<p>News feed: {data}</p>
				</div>
			</div>
		)
	}
}

module.exports = NewsFeed;
