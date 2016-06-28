var React = require('react');
var SearchBar = require('../partials/searchbar.js');

class Search extends React.Component {
	render() {
		return (
			<div className="search-page">
				<div className="container-fluid">
					<div className="row">
						<div className="col-xs-6">
							<div className="search-area">
								<SearchBar />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = Search;
