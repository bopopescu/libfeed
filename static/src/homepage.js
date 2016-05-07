var React = require('react');
var SearchBar = require('./partials/searchbar.js');

class Home extends React.Component {
	render() {
		return (
			<div className="home-page">
				<div className="container-fluid">
					<div className="search-area">
						<h4>Search for books, authors, or students.</h4>
						<SearchBar />
					</div>
				</div>
			</div>
		)
	}
}

module.exports = Home;
