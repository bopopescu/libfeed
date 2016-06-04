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
					<div className="container-fluid">
						<div className="row">
							<h3 className="author-title">{data.name}</h3>
							<ul>
								{data.books.map( book => {
									return (<li><Link to={'/books/'+book.isbn}>{book.title}</Link></li>)
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


module.exports = Author;
