var React = require('react');
var Link = require('react-router').Link;
var api = require('../api.js');

class Genre extends React.Component {

	constructor() {
		super();
		this.state = {data: null};
	}

	componentDidMount() {
		api.getBooksByGenre(this.props.params.genre, (err, data) => {
			if (err) console.err("[UserPage:componentDidMount] There's been an error retrieving data!");
			else {
				this.setState({data: data.books});
			}
		});
	}

	render() {
		var data = this.state.data;
		if (data) {
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
													<p className="student-name"><Link to={'/books/'+book.isbn}>{book.title}</Link></p>
													<ul className="browse-authors">
														{book.authors.map( author => {
															return (<li>{author.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>)
														})}
													</ul>
													<ul className="browse-genres">
														{book.genres.map( genre => {
															return (<li>{genre.description}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>)
														})}
													</ul>
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


module.exports = Genre;
