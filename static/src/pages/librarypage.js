var React = require('react');
var api = require('../api.js');

class Library extends React.Component {

	constructor() {
		super();
		this.state = {data: null};
	}

	componentDidMount() {
		api.getLibrary(this.props.params.libraryId, (err, data) => {
			if (err) console.err("[UserPage:componentDidMount] There's been an error retrieving data!");
			else {
				this.setState({data: data.library});
			}
		});
	}

	render() {
		var data = this.state.data;
		console.log(data);
		if (data) {
			return (
				<div className="library-page">
					<div className="container-fluid">
						<h3>Library</h3>
						<p>Name: {data.name}</p>
						<p>Address: {data.address}</p>
						<p>City: {data.city}</p>
						<p>State: {data.state}</p>
						<div>
							<h3>Books</h3>
							{data.library_copies.map( book => {
								return (<p>{book.id} {book.title} --- {book.status}</p>)
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


module.exports = Library;
