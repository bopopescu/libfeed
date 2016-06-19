var React = require('react');
var Link = require('react-router').Link;
var api = require('../api.js');
var Paginator = require('../partials/paginator.js');
var LIMIT = 10;

class Genre extends React.Component {

	constructor(props) {
		super(props);
		var page = parseInt(props.location.query.page) || 1;
		this.state = {data: null, page: page, lastPage: null};
	}

	componentDidMount() {
		this.getData(this.state.page);
	}

	getData(page) {
		var offset = (page-1)*LIMIT;
		console.log(offset);
		console.log(LIMIT);
		api.getBooksByGenre(LIMIT, offset, this.props.params.genre, (err, data) => {
			if (err) console.err("[UserPage:componentDidMount] There's been an error retrieving data!");
			else {
				this.setState({data: data.books, lastPage: Math.ceil(data.count/LIMIT)});
			}
		});
	}

	render() {
		var data = this.state.data;
		if (data) {
			return (
				<div id="book-page">
					<div className="container-fluid">
						<Paginator
							pagePath={'/'+this.props.params.genre}
							currentPage={this.state.page}
							lastPage={this.state.lastPage}
							pageLimit={5}
							changePage={this.getData.bind(this)}
						/>
						<div className="row">
							<h4>Books - {this.props.params.genre}</h4>
							<ul>
								{data.map( book => {
									return (<div>
												<hr />
												<li>
													<p className="list-book-name"><Link to={'/books/'+book.isbn}>{book.title}</Link></p>
													<ul className="browse-authors">
														{book.authors.map( author => {
															return (<li><Link to={'/authors/'+author.id}>{author.name}</Link></li>)
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
