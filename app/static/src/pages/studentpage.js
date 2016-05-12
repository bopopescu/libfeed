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
							<div className="col-xs-6">
								<div className="student-page-name">
									<h4>{data.first_name} {data.last_name}</h4>
									<button type="button" className="btn btn-primary follow-btn" onClick={follow_status ? this.unfollow.bind(this, data.id) : this.follow.bind(this, data.id) }>{follow_status ? 'Unfollow' : 'Follow'}</button>
								</div>
								<br /><br />
								<img src={data.img} className="student-img"/>
							</div>
							<div className="col-xs-6">
								<h6>Currently Reading</h6>
								<ul>
								{data.current_borrows.map( book => {
									return (<li className="current-read"><Link to={'/books/'+book.isbn} className="book-title">{book.title}</Link> by {book.author}</li>)
								})}
								</ul>
							</div>
						</div>
						<br />
						<br />
						<div className="row">
							<div className="col-xs-12">
								<h3>Reviews</h3>
								<ul>
								{data.reviews.map( review => {
									return (<div>
												<hr />
												<li>
													<p><Link to={'/books/'+review.isbn} className="book-title">{review.title}</Link><span className="rating">,&nbsp;&nbsp;&nbsp;&nbsp;{review.author}&nbsp;&nbsp;&nbsp;&nbsp;{review.rating} stars</span></p>
													<p>"{review.description}"</p>
												</li>
											</div>)
								})}
								</ul>
							</div>
							<div className="col-xs-12">
								<h3>Followers</h3>
								<ul>
								{data.followers.map( follower => {
									return (<div className="list">
												<li>
													<img src={follower.img} className="thumbnail"/>
													<p><Link to={'/students/'+follower.id}>{follower.first_name} {follower.last_name}</Link></p>
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
