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
				<div className="book-page">
					<div className="container-fluid">
						<h3>Book</h3>
						<p>Title: {data.title}</p>
						<p>Author: {data.author}</p>
						<p>{data.synopsis}</p>
						<img src={data.img} />
						<div>
							<h3>Reviews</h3>
							{data.reviews.map( review => {
								return (<p>{review.description} --- by {review.person_name}</p>)
							})}
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
