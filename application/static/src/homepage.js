var React = require('react');
var SearchBar = require('./partials/searchbar.js');

class Home extends React.Component {
	render() {
		return (
			<div className="home-page">
				<div className="container-fluid">
					<div className="search-area">
						<SearchBar />
					</div>
				</div>
			</div>
		)
	}
}

module.exports = Home;
