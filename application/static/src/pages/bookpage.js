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
				var sum = 0;
				var review_length;
				var avg_rating = 0;
				if (data.book.reviews.length > 0) {
					review_length = data.book.reviews.length;
					for (var i = 0; i < review_length; i++) {
						sum += data.book.reviews[i].rating;
					}
					avg_rating = sum/review_length;
					console.log('here');
				}
				console.log(avg_rating);
				this.setState({data: data.book, checked_out: data.checked_out, reviews: data.book.reviews, user: data.user, rating: "", avg_rating: avg_rating});
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
			reviews: this.state.reviews,
			avg_rating: (this.state.avg_rating*(this.state.reviews.length-1)+rating) / this.state.reviews.length,
			rating: "",
		})
		React.findDOMNode(this.refs.reviewinput).value = "";
	}

	handleReview(event) {
        this.setState({description: event.target.value})
    }

	changeRating(ratingValue) {
		this.setState({rating: ratingValue})
	}

	render() {
		var data = this.state.data;
		var checked_out = this.state.checked_out;
		var reviews = this.state.reviews;
		var description = "";
		var rating = this.state.rating;
		var avg_rating = (Math.round(this.state.avg_rating * 2)/2).toFixed(1);

		console.log(avg_rating);
		if (data) {
			return (
				<div id="book-page">
					<div className="container-fluid">
						<div className="row">
							<div className="col-xs-6 col-sm-6 col-md-6 book-header">
								<div className="book-info">
									<h3 className="book-title-main">{data.title}</h3>
								</div>
							</div>
							<div className="col-xs-6 col-sm-6 col-md-6 book-status">
								<button type="button" className="btn btn-primary checkout-btn" onClick={!checked_out > 0 ? this.checkOut.bind(this, data.isbn) : ''} disabled={checked_out}>{!checked_out ? "Check Out" : 'Checked Out'}</button>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12 col-sm-3 col-md-3 book-header">
								<img src={data.img} className="book-img"/>
							</div>
							<div className="col-xs-12 col-sm-3 col-md-3">
								<p className="user-detail">Authors</p>
								<ul className="authors">
									{data.authors.map( author => {
										return (<li><Link to={'/authors/'+author.id}>{author.name}</Link></li>)
									})}
								</ul>
								<p className="user-detail">Genres</p>
								<ul className="genres">
									{data.genres.map( genre => {
										return (<li><Link to={'/browse/'+genre.description}>{genre.description}</Link></li>)
									})}
								</ul>
							</div>
							<div className="col-xs-12 col-sm-6 col-md-6">
								<p className="synopsis">{data.synopsis}</p>
							</div>
						</div>
						<br />
						<div className="row">
							<div className="col-xs-12 col-sm-6 col-md-6">
								<h3>Reviews</h3>
								<p className={avg_rating == 0 ? "none": "grade"}>Average Rating: {avg_rating}</p>
								<ul>
									{data.reviews.map( review => {
										return (<div>
													<hr />
													<li>
														<p className="student-name"><Link to={'/students/'+review.student_id}>{review.student_name}</Link>&nbsp;&nbsp;&nbsp;&nbsp;
														<span className="user-detail">{review.rating} {review.rating==1 ? 'star' : 'stars'}</span>
														<span className="user-detail">&nbsp;&nbsp;&nbsp;&nbsp;{review.date}</span>
														</p>
														<p className="review-descrip">{review.description}</p>
													</li>
												</div>)
									})}
								</ul>
								<hr />
							</div>
						</div>
						<div className="row">
							<form className="reviewForm">
								<div className="col-xs-12 col-sm-4 col-md-4">
								<textarea placeholder="Write Review" ref="reviewinput" type="text" onChange={this.handleReview.bind(this)} />
								</div>
								<div className="col-xs-12 col-sm-4 col-md-4 rating-select">
								<span className="rating-selector">Rating: <button type="button" className={rating==1 ? "btn btn-primary rating-btn-selected" : "btn btn-primary rating-btn"} onClick={this.changeRating.bind(this, 1)}>1</button>&nbsp;
								<button type="button" className={rating==2 ? "btn btn-primary rating-btn-selected" : "btn btn-primary rating-btn"} onClick={this.changeRating.bind(this, 2)}>2</button>&nbsp;
								<button type="button" className={rating==3 ? "btn btn-primary rating-btn-selected" : "btn btn-primary rating-btn"} onClick={this.changeRating.bind(this, 3)}>3</button>&nbsp;
								<button type="button" className={rating==4 ? "btn btn-primary rating-btn-selected" : "btn btn-primary rating-btn"} onClick={this.changeRating.bind(this, 4)}>4</button>&nbsp;
								<button type="button" className={rating==5 ? "btn btn-primary rating-btn-selected" : "btn btn-primary rating-btn"} onClick={this.changeRating.bind(this, 5)}>5</button></span>
								</div>
								<div className="col-xs-12 col-sm-4 col-md-4">
								<button type="button" className="btn btn-primary review-btn" onClick={this.writeReview.bind(this, data.isbn, this.state.description, this.state.rating)} disabled={!(rating && this.state.description)}>Post Review</button>
								</div>
							</form>
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
