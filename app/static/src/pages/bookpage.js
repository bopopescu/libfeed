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
				this.setState({data: data.book, checked_out: data.checked_out, available: data.available});
			}
		});
	}

	checkOut(isbn) {
		api.checkOut(isbn);
		this.setState({
		  checked_out: true,
		  available: this.state.available-1
		});
	}

	render() {
		var data = this.state.data;
		var checked_out = this.state.checked_out;
		var available = this.state.available;
		console.log(data);
		console.log(checked_out);
		console.log(available);
		if (data) {
			return (
				<div id="book-page">
					<div className="container-fluid">
						<div className="row">
							<div className="col-xs-12">
								<h3 className="book-title">{data.title}</h3>
								<p className="author">{data.author}</p>
								<p>{available>0 ? "Available" : "Not Available"}</p>
								<button type="button" className="btn btn-primary checkout" onClick={!checked_out && available>0 ? this.checkOut.bind(this, data.isbn) : ''}>{!checked_out ? "Check Out" : 'Checked Out'}</button>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-6">
								<img src={data.img} className="book-img"/>
							</div>
							<div className="col-xs-6">
								<p>{data.synopsis}</p>
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
														<h4><Link to={'/users/'+review.person_id}>{review.person_name}</Link> <span className="rating">{review.rating} stars</span></h4>
														<p>"{review.description}"</p>
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


module.exports = Book;
