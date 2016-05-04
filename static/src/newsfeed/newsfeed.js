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
			else this.setState({data: data});
		});
	}

	render() {
		var data = this.state.data;
		if (data) {
			console.log(data);
			return (
				<div className="newsfeed">
					<div className="container-fluid">
						<p>News Feed</p>
						<ul>
						{data.borrowed_books.map( book => {
							return (<li>{book.title}</li>)
						})}
						</ul>
						<ul>
						{data.reviews.map( review => {
							return (<li>{review.id}</li>)
						})}
						</ul>
					</div>
				</div>
			)
		} else {
			return (<div></div>)
		}
	}
}

module.exports = NewsFeed;
