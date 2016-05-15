var React = require('react');
var Link = require('react-router').Link;
var api = require('../api.js');

class Browse extends React.Component {

	constructor() {
		super();
		this.state = {data: null};
	}

	componentDidMount() {
		api.getGenres((err, data) => {
			if (err) console.err("[UserPage:componentDidMount] There's been an error retrieving data!");
			else {
				this.setState({data: data.genres});
			}
		});
	}

	render() {
		var data = this.state.data;
		if (data) {
			return (
				<div id="genre-page">
					<div className="container-fluid">
						<div className="row">
							<h4>Genres</h4>
							<ul>
								{data.map( genre => {
									return (<li><Link to={'/browse/'+genre.description}>{genre.description}</Link></li>)
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


module.exports = Browse;
