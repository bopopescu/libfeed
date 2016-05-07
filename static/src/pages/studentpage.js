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
				this.setState({data: data.student});
			}
		});
	}

	render() {
		var data = this.state.data;
		if (data) {
			return (
				<div id="student-page">
					<div className="container-fluid">
						<div className="row">
							<div className="col-xs-6">
								<h3>{data.first_name} {data.last_name}</h3>
								<img src={data.img} className="student-img"/>
							</div>
							<div className="col-xs-6">
								<h3>Currently Reading</h3>
								<ul>
								{data.current_borrows.map( book => {
									return (<li><Link to={'/books/'+book.isbn}>{book.title}</Link></li>)
								})}
								</ul>
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
													<h4><Link to={'/books/'+review.isbn}>{review.title}</Link><span className="rating">{review.rating} stars</span></h4>
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
