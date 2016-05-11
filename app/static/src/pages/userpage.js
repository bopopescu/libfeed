var React = require('react');
var Link = require('react-router').Link;
var api = require('../api.js');

class User extends React.Component {

	constructor() {
		super();
		this.state = {data: null};
	}

	componentDidMount() {
		api.getCurUserPage((err, data) => {
			if (err) console.err("[NewsFeed:componentDidMount] There's been an error retrieving data!");
			else this.setState({data: data.student, current_borrows: data.student.current_borrows});
		});
	}

	handleClick(id) {
		api.returnBook(id);
	  	var current_borrows = this.state.current_borrows.filter(function(cur_borrow){
	      return cur_borrow.id !== id;
	    });
	    this.setState({
	      current_borrows: current_borrows
	    });
	}

	render() {
		var data = this.state.data;
		var current_borrows = this.state.current_borrows;
		if (data) {
			return (
				<div id="user-page">
					<div className="container-fluid">
						<div className="row">
							<div className="col-xs-6 user-profile">
								<h4 className="user-name">{data.first_name} {data.last_name}</h4>
								<img src={data.img} className="user-img"/>
							</div>
							<div className="col-xs-6">
								<h6>Currently Reading</h6>
								<table className="table user-cur-reads">
  									<tbody>
										{current_borrows.map( borrow => {
											return ([<tr><td className="user-cur-read">
													<Link to={'/books/'+borrow.isbn} className="user-book-title">{borrow.title}</Link> by {borrow.author}</td>
													<td><p>Due {borrow.due_date}</p></td>
													<td><button type="button" className="btn btn-primary return-btn" onClick={this.handleClick.bind(this, borrow.id)}>Return</button></td></tr>])
										})}
									</tbody>
								</table>
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
													<h4><Link to={'/books/'+review.isbn} className="book-title">{review.title}</Link><span className="rating">&nbsp;&nbsp;&nbsp;&nbsp;{review.author}&nbsp;&nbsp;&nbsp;&nbsp;{review.rating} stars</span></h4>
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


module.exports = User;
