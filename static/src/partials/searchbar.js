var React = require('react');
var Link = require('react-router').Link;
var api = require('../api.js');
var searchTerm;

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {searchTerm: ""}
    }

    handleChange(event) {
        this.setState({searchTerm: event.target.value})
    }

    handleKeyDown(event) {
        if(event.keyCode === 13) {
            document.getElementById('searchButton').click();
        }
    }

	render() {
		return (
            <div className="row">
            <div className="col-xs-3">
    			<form className="searchForm">
    				<input type="text" placeholder="Search" onKeyDown={this.handleKeyDown.bind(this)} onChange={this.handleChange.bind(this)} />
    			</form>
            </div>
            <div className="col-xs-9">
                <Link id="searchButton" to={'/search/'+this.state.searchTerm} className="searchButton">Go</Link>
            </div>
            </div>
		)
	}
}

module.exports = SearchBar;
