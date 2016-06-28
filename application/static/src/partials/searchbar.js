var React = require('react');
var Link = require('react-router').Link;
var api = require('../api.js');
var searchTerm;

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {searchTerm: "", searchType: ""}
    }

    handleChange(event) {
        this.setState({searchTerm: event.target.value})
    }

    handleKeyDown(event) {
        if(event.keyCode === 13) {
            document.getElementById('searchButton').click();
        }
    }

    changeType(selectedType) {
        this.setState({searchType: selectedType})
    }

	render() {
        var searchType = this.state.searchType;
        var searchTerm = this.state.searchTerm;
		return (
            <div className="row">
            <h6 className="search-bar">Search for: <button type="button" className={searchType=="student" ? "btn btn-primary searchtype-student-btn searchtype-selected" : "btn btn-primary searchtype-student-btn"} onClick={this.changeType.bind(this, 'student')}>students</button>&nbsp;
            <button type="button" className={searchType=="book" ? "btn btn-primary searchtype-book-btn searchtype-selected" : "btn btn-primary searchtype-book-btn"} onClick={this.changeType.bind(this, 'book')}>books</button>&nbsp;
            <button type="button" className={searchType=="author" ? "btn btn-primary searchtype-author-btn searchtype-selected" : "btn btn-primary searchtype-author-btn"} onClick={this.changeType.bind(this, 'author')}>authors</button></h6>
            <div className="col-xs-6 col-md-8">
    			<form className={searchType ? "searchForm" : "none"}>
    				<input type="text" placeholder="Search" onKeyDown={this.handleKeyDown.bind(this)} onChange={this.handleChange.bind(this)} disabled={!searchType}/>
    			</form>
            </div>
            <div className={searchTerm ? "col-xs-12 col-md-3 searchButton" : "none"}>
                <Link id="searchButton" to={'/search/'+this.state.searchType+'/'+this.state.searchTerm} className="searchButton">Go</Link>
            </div>
            </div>
		)
	}
}

module.exports = SearchBar;
