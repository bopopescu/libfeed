var React = require('react');
var api = require('../api.js');
var Link = require('react-router').Link;

class BookResults extends React.Component {

	constructor() {
		super();
		this.state = {data: null};
	}

	componentDidMount() {
		this.setSearchData(this.props.params.searchTerm);
	}

	componentWillReceiveProps(props) {
		this.setState({data: null});
		this.setSearchData(props.params.searchTerm);
	}

	setSearchData(searchTerm) {
		api.searchBook(searchTerm, (err, data) => {
			if (err) console.error("[SearchPage:componentDidMount] There's been an error retrieving data!");
			else this.setState({data: data});
		})
	}

	render() {
		var data = this.state.data;
		if (data){
			console.log(data);
			return (
				<div className="search-results">
					<div className="container">
						<div className="row">
							<div className={data.books.length ? "col-xs-12 col-sm-12 col-md-6 search-results-area" : "none"}>
								<h3>Search Results for <span className="result-found">“{this.props.params.searchTerm}”</span></h3>
								<hr />
								<h6>Books</h6>
								<div className="panel-body list-group">
									{data.books.slice(0, 20).map( book => {
										return (<Link to={'/books/'+book.isbn} className="list-group-item">{book.title}</Link>)
									})}
								</div>
							</div>
							<div className={data.books.length ? "none" : "col-xs-12 col-sm-12 col-md-6 search-results-area"}>
								<h3>No Results Found for <span className="result-found">“{this.props.params.searchTerm}”</span></h3>
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div></div>
			)
		}
	}
}

module.exports = BookResults;
