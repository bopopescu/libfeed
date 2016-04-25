var React = require('react');
var api = require('../api.js');

class NewsFeed extends React.Component {

	constructor() {
		super();
		this.state = {data: null};
	}

	componentDidMount() {
		api.getCurrentUser((err, data) => {
			if (err) console.err("[NewsFeed:componentDidMount] There's been an error retrieving data!");
			else this.setState({data: data.user});
		});
	}

	render() {
		var data = this.state.data;
		console.log(data);
		if (data) {
			return (
				<div className="newsfeed">
					<div className="container-fluid">
						<p>News feed: {data.name}</p>
					</div>
				</div>
			)
		} else {
			return (<div></div>)
		}
	}
}

module.exports = NewsFeed;
