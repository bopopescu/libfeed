var React = require('react');
var api = require('../api.js');
var Link = require('react-router').Link;

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
			return (
				<div className="newsfeed">
					<div className="container-fluid">
						<h3>News Feed</h3>
						<div className="row">
							<div className="col-xs-6">
								<ul>
								{data.borrowed_books.map( book => {
									return (<li><Link to={'/users/'+book.person.id}>{book.person.name}</Link> checked out <Link to={'/books/'+book.book.isbn}>{book.book.title}</Link> on {book.date_checked_out}</li>)
								})}
								</ul>
							</div>
							<div className="col-xs-6">
								<ul>
								{data.reviews.map( review => {
									return (<li><Link to={'/users/'+review.person.id}>{review.person.name}</Link> wrote a review for <Link to={'/books/'+review.book.isbn}>{review.book.title}</Link> on {review.date}</li>)
								})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return (<div></div>)
		}
	}
}

module.exports = NewsFeed;
