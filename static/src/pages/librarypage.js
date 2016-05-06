var React = require('react');
var Link = require('react-router').Link;
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
						<div className="row">
							<div className="col-xs-12 lib-logo">
								<img src={data.logo} />
							</div>
						</div>
						<div className="row">
							<div className="row col-xs-6">
								<h3>{data.name}</h3>
								<p>{data.address}</p>
								<p>{data.city}, {data.state} {data.zip}</p>
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


module.exports = Library;
