var React = require('react');
var Link = require('react-router').Link;
var api = require('../api.js');

class Author extends React.Component {

	constructor() {
		super();
		this.state = {data: null};
	}

	componentDidMount() {
		api.getAuthor(this.props.params.authorId, (err, data) => {
			if (err) console.err("[UserPage:componentDidMount] There's been an error retrieving data!");
			else {
				this.setState({data: data.author});
			}
		});
	}

	render() {
		var data = this.state.data;
		if (data) {
			return (
				<div id="author-page">
					<div className="container">
						<div className="row">
						<div className="col-xs-12">
							<p className="author-title">{data.name}</p>
							<hr />
							<ul>
								{data.books.map( book => {
									return (<li className="author-book-title"><Link to={'/books/'+book.isbn}>{book.title}</Link></li>)
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


module.exports = Author;
