var React = require('react');
var Link = require('react-router').Link;
var api = require('../api.js');

class Browse extends React.Component {

	constructor() {
		super();
		this.state = {data: null};
	}

	componentDidMount() {
		api.getBooks((err, data) => {
			if (err) console.err("[UserPage:componentDidMount] There's been an error retrieving data!");
			else {
				this.setState({data: data.books});
			}
		});
	}

	render() {
		var data = this.state.data;
		if (data) {
			console.log(data);
			return (
				<div id="book-page">
					<div className="container-fluid">
						<div className="row">
							<h4>Books</h4>
							<ul>
								{data.map( book => {
									return (<div>
												<hr />
												<li>
													<p className="student-name"><Link to={'/book/'+book.isbn}>{book.title}</Link>&nbsp;&nbsp;&nbsp;&nbsp;
													<span className="user-detail">{book.author}</span>
													<span className="user-detail">&nbsp;&nbsp;&nbsp;&nbsp;{book.genre}</span>
													</p>
													<p className="review-descrip">{book.synopsis}</p>
												</li>
											</div>)
								})}
							</ul>
						</div>
					</div>
				</div>
			)
		} else {
			return (<div></div>)
		}
	}
}


module.exports = Browse;
