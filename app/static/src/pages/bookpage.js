var React = require('react');
var Link = require('react-router').Link;
var api = require('../api.js');

class Book extends React.Component {

	constructor() {
		super();
		this.state = {data: null};
	}

	componentDidMount() {
		api.getBook(this.props.params.bookIsbn, (err, data) => {
			if (err) console.err("[UserPage:componentDidMount] There's been an error retrieving data!");
			else {
				this.setState({data: data.book, checked_out: data.checked_out, reviews: data.book.reviews, user: data.user});
			}
		});
	}

	checkOut(isbn) {
		api.checkOut(isbn);
		this.setState({
		  checked_out: true
		});
	}

	writeReview(isbn, description, rating) {
		api.writeReview(isbn, description, rating);
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yy = today.getFullYear();
		today = mm+'/'+dd+'/'+yy;
		var reviews = this.state.reviews.push({'description': description, 'rating': rating, 'date': today, 'student_name': this.state.user.first_name + ' ' + this.state.user.last_name, 'student_id': this.state.user.id});
		this.setState({
			reviews: this.state.reviews
		})
		React.findDOMNode(this.refs.reviewinput).value = "";
		React.findDOMNode(this.refs.ratinginput).value = "";
	}

	handleReview(event) {
        this.setState({description: event.target.value})
    }

	handleRating(event) {
		this.setState({rating: event.target.value})
	}

	render() {
		var data = this.state.data;
		var checked_out = this.state.checked_out;
		var reviews = this.state.reviews;
		var description = "";
		var rating = "";
		if (data) {
			return (
				<div id="book-page">
					<div className="container-fluid">
						<div className="row">
							<div className="col-xs-6 book-header">
								<div className="book-info">
									<h3 className="book-title-main">{data.title}</h3>
								</div>
							</div>
							<div className="col-xs-6 book-status">
								<button type="button" className="btn btn-primary checkout-btn" onClick={!checked_out > 0 ? this.checkOut.bind(this, data.isbn) : ''}>{!checked_out ? "Check Out" : 'Checked Out'}</button>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-3 book-header">
								<img src={data.img} className="book-img"/>
							</div>
							<div className="col-xs-3">
								<p className="user-detail">Authors</p>
								<ul className="authors">
									{data.authors.map( author => {
										return (<li>{author.name}</li>)
									})}
								</ul>
								<p className="user-detail">Genres</p>
								<ul className="genres">
									{data.genres.map( genre => {
										return (<li>{genre.description}</li>)
									})}
								</ul>
							</div>
							<div className="col-xs-6">
								<p className="synopsis">{data.synopsis}</p>
							</div>
						</div>
						<br />
						<div className="row">
							<div className="col-xs-12">
								<h3>Reviews</h3>
								<ul>
									{data.reviews.map( review => {
										return (<div>
													<hr />
													<li>
														<p className="student-name"><Link to={'/students/'+review.student_id}>{review.student_name}</Link>&nbsp;&nbsp;&nbsp;&nbsp;
														<span className="user-detail">{review.rating} stars</span>
														<span className="user-detail">&nbsp;&nbsp;&nbsp;&nbsp;{review.date}</span>
														</p>
														<p className="review-descrip">{review.description}</p>
													</li>
												</div>)
									})}
								</ul>
								<hr />
								<form className="reviewForm">
									<input placeholder="Write Review" ref="reviewinput" type="text" onChange={this.handleReview.bind(this)} />
									<input className="ratinginput" placeholder="Rating" ref="ratinginput" type="text" onChange={this.handleRating.bind(this)} />
									<button type="button" className="btn btn-primary review-btn" onClick={this.writeReview.bind(this, data.isbn, this.state.description, this.state.rating)}>Post Review</button>
								</form>
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


module.exports = Book;
