var React = require('react');
var Link = require('react-router').Link;
var api = require('../api.js');

class Browse extends React.Component {

	constructor() {
		super();
		this.state = {data: null};
	}

	componentDidMount() {
		this.setState({data: ['Biography & Autobiography', 'Comics & Graphic Novels', 'Young Adult Fiction', 'Fiction', 'Young Adult Nonfiction']});
	}

	render() {
		var data = this.state.data;
		if (data) {
			return (
				<div id="genre-page">
					<div className="container-fluid">
						<div className="row">
							<div className="col-xs-6">
								<div className="genre-list">
									<h6>Genres</h6>
									<ul>
										{data.map( genre => {
											return (<li><Link to={'/browse/'+genre}>{genre}</Link></li>)
										})}
									</ul>
								</div>
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


module.exports = Browse;
