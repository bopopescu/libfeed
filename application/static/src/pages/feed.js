var React = require('react');
var api = require('../api.js');
var Link = require('react-router').Link;

class Feed extends React.Component {

	constructor() {
		super();
		this.state = {data: null};
	}

	componentDidMount() {
		api.getCurUserNewsfeed((err, data) => {
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
						<div className="row">
							<div className="col-xs-6 feed-items">
								<ul>
								{data.borrows.map( book => {
									return (<div className="news-list-item">
												<li>
													<span className="thumbnail">
														<img src={book.student.img} />
													</span>
													<span className="news-info">
														<Link to={'/students/'+book.student.id} className="student-name">{book.student.first_name} {book.student.last_name}</Link> checked out
														<Link to={'/books/'+book.book.isbn} className="book-title"> {book.book.title}</Link> {book.days_passed}.
													</span>
												</li><br />
											</div>)
								})}
								</ul>
								<ul>
								{data.reviews.map( review => {
									return (<div className="news-list-item">
												<li>
													<div className="thumbnail">
														<img src={review.student.img} />
													</div>
													<div className="news-info">
														<Link to={'/students/'+review.student.id} className="student-name">{review.student.first_name} {review.student.last_name}</Link> wrote a review for
														<Link to={'/books/'+review.book.isbn} className="book-title"> {review.book.title}</Link> {review.days_passed}.
													</div>
												</li><br />
											</div>)
								})}
								</ul>
								<p className={data.reviews.length > 0 || data.borrows.length > 0 ? "none": "followers-needed"}>Follow other students to see what books they have recently checked out or reviewed!</p>
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

module.exports = Feed;
