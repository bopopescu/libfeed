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
			else this.setState({data: data.student, borrows: data.student.borrows, returns: data.student.returns});
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

	render() {
		var data = this.state.data;
		var borrows = this.state.borrows;
		var returns = this.state.returns;
		if (data) {
			return (
				<div id="user-page">
					<div className="container-fluid">
						<div className="row">
							<div className="col-xs-6 user-profile">
								<h4 className="user-name">{data.first_name} {data.last_name}</h4>
								<p className="user-detail">{data.grade}th Grade</p>
								<img src={data.img} className="user-img"/>
							</div>
							<div className="col-xs-6">
								<h6>Currently Reading</h6>
								<table className="table user-cur-reads">
  									<tbody>
										{borrows.map( borrow => {
											return ([<tr><td className="user-cur-read">
													<Link to={'/books/'+borrow.isbn} className="user-book-title">{borrow.title}</Link>
													<span className="user-detail">&nbsp;&nbsp;&nbsp;&nbsp;{borrow.author}</span></td>
													<td><span className="user-due-date">Due {borrow.due_date}</span></td>
													<td><button type="button" className="btn btn-primary return-btn" onClick={this.handleClick.bind(this, borrow)}>Return</button></td></tr>])
										})}
									</tbody>
								</table>
							</div>
						</div>
						<br />
						<br />
						<div className="row">
							<div className="col-xs-6">
								<h3>Reviews</h3>
								<ul>
								{data.reviews.map( review => {
									return (<div>
												<hr />
												<li>
													<p><Link to={'/books/'+review.isbn} className="user-book-title">{review.title}
														</Link><span className="user-detail">&nbsp;&nbsp;&nbsp;&nbsp;{review.author}
														&nbsp;&nbsp;&nbsp;&nbsp;{review.rating} stars&nbsp;&nbsp;&nbsp;&nbsp;{review.date}</span>
													</p>
													<p className="review-descrip">{review.description}</p>
												</li>
											</div>)
								})}
								<hr />
								</ul>
							</div>
							<div className="col-xs-6 user-past">
								<h6>Past Reads</h6>
								<table className="table user-past-reads">
									<tbody>
										{returns.map( r => {
											return ([<tr><td className="user-past-read">
													<Link to={'/books/'+r.isbn} className="user-book-title">{r.title}</Link><span className="user-detail">&nbsp;&nbsp;&nbsp;&nbsp;{r.author}</span></td>
													<td><span className="user-return-date">Returned {r.date_returned}</span></td></tr>])
										})}
									</tbody>
								</table>
							</div>
						</div>
						<div className="row follow-row">
							<div className="col-xs-12">
								<h3>Followers</h3>
								<ul>
								{data.followers.map( follower => {
									return (<div className="list">
												<li>
													<img src={follower.img} className="thumbnail"/>
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
