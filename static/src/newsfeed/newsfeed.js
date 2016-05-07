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
						<h3 className="header">News Feed</h3>
						<div className="row">
							<div className="col-xs-6">
								<ul>
								{data.current_borrows.map( book => {
									return (<div className="list"><li><img src={book.student.img} className='thumbnail' />
											<Link to={'/students/'+book.student.id}>{book.student.first_name} {book.student.last_name}</Link> checked out
											<Link to={'/books/'+book.book.isbn}>{book.book.title}</Link> on {book.date_checked_out}</li>
											<br /></div>)
								})}
								</ul>
							</div>
							<div className="col-xs-6">
								<ul>
								{data.reviews.map( review => {
									return (<div className="list"><li><img src={review.student.img} className='thumbnail' />
											<Link to={'/students/'+review.student.id}>{review.student.first_name} {review.student.last_name}</Link> wrote a review for
											<Link to={'/books/'+review.book.isbn}>{review.book.title}</Link> on {review.date}</li>
											<br /></div>)
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
