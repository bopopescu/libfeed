var React = require('react');
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
				this.setState({data: data.book});
			}
		});
	}

	render() {
		var data = this.state.data;
		console.log(data);
		if (data) {
			return (
				<div id="book-page">
					<div className="container-fluid">
						<div className="row">
							<div className="col-xs-12">
								<h3>{data.title}</h3>
								<h4>{data.author}</h4>
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
														<h4>{review.person_name} <span className="rating">{review.rating} stars</span></h4>
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
