var React = require('react');
var api = require('../api.js');
var Link = require('react-router').Link;

class NewsFeed extends React.Component {

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
							<div className="col-xs-6">
								<ul>
								{data.current_borrows.map( book => {
									return (<div className="news-list-item"><li><img src={book.student.img} className='thumbnail' />
											<Link to={'/students/'+book.student.id} className="student-name">{book.student.first_name} {book.student.last_name}</Link> checked out
											<Link to={'/books/'+book.book.isbn} className="book-title"> {book.book.title}</Link>.</li><br /></div>)
								})}
								</ul>
							</div>
							<div className="col-xs-6">
								<ul>
								{data.reviews.map( review => {
									return (<div className="news-list-item"><li><img src={review.student.img} className='thumbnail' />
											<Link to={'/students/'+review.student.id} className="student-name">{review.student.first_name} {review.student.last_name}</Link> wrote a review for
											<Link to={'/books/'+review.book.isbn} className="book-title"> {review.book.title}</Link>.</li><br /></div>)
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
