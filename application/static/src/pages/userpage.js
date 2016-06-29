var React = require('react');
var Link = require('react-router').Link;
var api = require('../api.js');

class User extends React.Component {

	constructor() {
		super();
		this.state = {data: null, photo: false};
	}

	componentDidMount() {
		api.getCurUserPage((err, data) => {
			if (err) console.err("[NewsFeed:componentDidMount] There's been an error retrieving data!");
			else this.setState({data: data.student, borrows: data.student.borrows, returns: data.student.returns, reviews: data.student.reviews});
		});
	}

	handleClick(borrow) {
		api.returnBook(borrow.isbn);
	  	var borrows = this.state.borrows.filter(function(cur_borrow){
	      return cur_borrow.isbn !== borrow.isbn;
	    });
		var today = new Date();
		today = (today.getMonth()+1).toString() + '/' + today.getDate().toString() + '/' + today.getYear().toString().substring(1);
		var r = {'author': borrow.author, 'date_returned': today, 'isbn': borrow.isbn, 'title': borrow.title};
		var returns = this.state.returns;
		returns.push(r);
		this.setState({
	      borrows: borrows,
		  returns: returns
	    });
	}

	deleteBorrow(borrow) {
		api.deleteBorrow(borrow.isbn);
		var borrows = this.state.borrows.filter(function(cur_borrow){
		  return cur_borrow.isbn !== borrow.isbn;
		});
		this.setState({
		  borrows: borrows
		});
	}

	deleteReview(review) {
		api.deleteReview(review.id);
		var reviews = this.state.reviews.filter(function(cur_review){
		  return cur_review.id !== review.id;
		});
		this.setState({
		  reviews: reviews
		});
	}

	deleteReturn(r) {
		api.deleteReturn(r.isbn);
		var returns = this.state.returns.filter(function(cur_r){
		  return cur_r.isbn !== r.isbn;
		});
		this.setState({
		  returns: returns
		});
	}

	handleClickPhoto() {
		this.setState({
			photo: true
		});
	}

	render() {
		var data = this.state.data;
		var borrows = this.state.borrows;
		var returns = this.state.returns;
		var reviews = this.state.reviews;
		var photo = this.state.photo;
		console.log(borrows);
		if (data) {
			return (
				<div id="user-page">
					<div className="container-fluid">
						<div className="row">
							<div className="col-xs-12 col-sm-12 col-md-6 user-profile">
								<h6 className="user-name">{data.first_name} {data.last_name}</h6>
								<p className="grade">{data.grade}th Grade</p>
								<div className="student-img">
									<img src={data.img} /><br />
								</div>
								<button type="button" className={photo ? 'none' : "btn btn-primary upload-click-btn"} onClick={this.handleClickPhoto.bind(this)}>Upload Photo</button>
								<div className={photo ? 'photo' : 'none'} >
									<form action="api/upload" method="post" encType="multipart/form-data">
		  								<input className="upload" type="file" name="file" /><br />
		  								<input className="upload-btn btn btn-primary" type="submit" value="Upload" />
									</form>
								</div>
							</div>
							<div className="col-xs-12 col-sm-12 col-md-6">
								<h6>Currently Reading</h6>
								<p className={borrows.length > 0 ? "none": "grade"}>Go check out a book!</p>
								<table className="table user-cur-reads">
  									<tbody>
										{borrows.map( borrow => {
											return ([<tr><td className="user-cur-read">
													<Link to={'/books/'+borrow.isbn} className="user-book-title">{borrow.title}</Link>
													<span className="user-detail">&nbsp;&nbsp;&nbsp;&nbsp;{borrow.author}</span></td>
													<td><span className="user-due-date">Due {borrow.due_date}</span></td>
													<td><button type="button" className="btn btn-primary return-btn" onClick={this.handleClick.bind(this, borrow)}>Return</button></td>
													<td><button type="button" className="btn btn-primary delete-btn" onClick={this.deleteBorrow.bind(this, borrow)}>Delete</button></td></tr>])
										})}
									</tbody>
								</table>
							</div>
						</div>
						<br />
						<br />
						<div className="row">
							<div className="col-xs-12 col-sm-12 col-md-6">
								<h6>Reviews</h6>
								<ul>
								<p className={reviews.length > 0 ? "none": "grade"}>Go review a book!</p>
								{reviews.map( review => {
									return (<div>
												<hr />
												<li>
													<p><Link to={'/books/'+review.isbn} className="user-book-title">{review.title}</Link>
														<span className="user-detail">&nbsp;&nbsp;&nbsp;&nbsp;{review.author}
														&nbsp;&nbsp;&nbsp;&nbsp;{review.rating} stars&nbsp;&nbsp;&nbsp;&nbsp;{review.date}</span>
														<span><button type="button" className="btn btn-primary delete-btn" onClick={this.deleteReview.bind(this, review)}>Delete</button></span>
													</p>
													<p className="review-descrip">{review.description}</p>
												</li>
											</div>)
								})}
								</ul>
							</div>
							<div className="col-xs-12 col-sm-12 col-md-6 user-past">
								<h6>Past Reads</h6>
								<p className={returns.length > 0 ? "none": "grade"}>Books you return will appear here.</p>
								<table className="table user-past-reads">
									<tbody>
										{returns.map( r => {
											return ([<tr>
													<td className="user-past-read"><Link to={'/books/'+r.isbn} className="user-book-title">{r.title}</Link></td>
													<td><span className="user-return-date">Returned {r.date_returned}</span></td>
													<td><button type="button" className="btn btn-primary delete-btn" onClick={this.deleteReturn.bind(this, r)}>Delete</button></td>
													</tr>])
										})}
									</tbody>
								</table>
							</div>
						</div>
						<div className="row follow-row">
							<div className="col-xs-12 col-sm-12 col-md-6">
								<h6>Followers</h6>
								<p className={data.followers.length > 0 ? "none": "grade"}>Follow other students!</p>
								<ul>
								{data.followers.map( follower => {
									return (<div className="list">
												<li>
													<img src={follower.img} className="thumbnail-follower"/>
													<p className="followers"><Link to={'/students/'+follower.id}>{follower.first_name} {follower.last_name}</Link></p>
												</li>
											</div>)
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


module.exports = User;
