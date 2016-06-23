var React = require('react');
var Link = require('react-router').Link;
var api = require('../api.js');

class Student extends React.Component {

	constructor() {
		super();
		this.state = {data: null};
	}

	componentDidMount() {
		api.getStudent(this.props.params.studentId, (err, data) => {
			if (err) console.err("[UserPage:componentDidMount] There's been an error retrieving data!");
			else {
				this.setState({data: data.student, follow_status: data.follow_status});
			}
		});
	}

	follow(id) {
		api.follow(id);
	    this.setState({
	      follow_status: true
	    });
	}

	unfollow(id) {
		api.unfollow(id);
	    this.setState({
	      follow_status: false
	    });
	}

	render() {
		var data = this.state.data;
		var follow_status = this.state.follow_status;
		if (data) {
			return (
				<div id="student-page">
					<div className="container-fluid">
						<div className="row">
							<div className="col-xs-6 user-profile">
								<div className="student-page-name">
									<h4 className="user-name">{data.first_name} {data.last_name}</h4>
									<button type="button" className="btn btn-primary follow-btn" onClick={follow_status ? this.unfollow.bind(this, data.id) : this.follow.bind(this, data.id) }>{follow_status ? 'Unfollow' : 'Follow'}</button>
								</div>
								<p className="grade">{data.grade}th Grade</p>
								<div className="student-img">
									<img src={data.img} />
								</div>
							</div>
							<div className="col-xs-6">
								<h6>Currently Reading</h6>
								<hr />
								<p className={data.borrows.length > 0 ? "none": "grade"}>No books currently checked out.</p>
								<ul>
								{data.borrows.map( book => {
									return (<li className="user-current-read"><Link to={'/books/'+book.isbn} className="user-book-title">{book.title}</Link></li>)
								})}
								</ul>
							</div>
						</div>
						<br />
						<br />
						<div className="row">
							<div className="col-xs-6">
								<h3>Reviews</h3>
								<p className={data.reviews.length > 0 ? "none": "grade"}>No reviews yet.</p>
								<ul>
								{data.reviews.map( review => {
									return (<div>
												<hr />
												<li>
													<p><Link to={'/books/'+review.isbn} className="user-book-title">{review.title}</Link>
													<span className="user-detail">,&nbsp;&nbsp;&nbsp;&nbsp;{review.author}&nbsp;&nbsp;&nbsp;&nbsp;
													{review.rating} {review.rating==1 ? 'star' : 'stars'}</span></p>
													<p className="review-descrip">{review.description}</p>
												</li>
											</div>)
								})}
								</ul>
							</div>
							<div className="col-xs-6 student-past-reads">
								<h6>Past Reads</h6>
								<hr />
								<p className={data.borrows.length > 0 ? "none": "grade"}>No books have been returned yet.</p>
								<ul>
								{data.returns.map( book => {
									return (<li className="user-past-read"><Link to={'/books/'+book.isbn} className="user-book-title">{book.title}</Link></li>)
								})}
								</ul>
							</div>
						</div>
						<div className="row follow-row">
							<div className="col-xs-12">
								<h3>Followers</h3>
								<p className={data.followers.length > 0 ? "none": "grade"}>No followers yet.</p>
								<ul>
								{data.followers.map( follower => {
									return (<div className="list">
												<li>
													<div className="thumbnail-follower">
														<img src={follower.img}/>
													</div>
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


module.exports = Student;
