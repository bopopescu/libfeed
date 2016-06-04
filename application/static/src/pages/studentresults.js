var React = require('react');
var api = require('../api.js');
var Link = require('react-router').Link;

class StudentResults extends React.Component {

	constructor() {
		super();
		this.state = {data: null};
	}

	componentDidMount() {
		this.setSearchData(this.props.params.searchTerm);
	}

	componentWillReceiveProps(props) {
		this.setState({data: null});
		this.setSearchData(props.params.searchTerm);
	}

	setSearchData(searchTerm) {
		api.searchStudent(searchTerm, (err, data) => {
			if (err) console.error("[SearchPage:componentDidMount] There's been an error retrieving data!");
			else this.setState({data: data});
		})
	}

	render() {
		var data = this.state.data;
		if (data){
			console.log(data);
			return (
				<div className="search-results">
					<div className="container">
						<h3>Search Results for “{this.props.params.searchTerm}”</h3>
						<hr />
						<h4>Students</h4>
						<div className="panel-body list-group">
							{data.students.slice(0, 20).map( student => {
								return (<Link to={'/students/'+student.id} className="list-group-item">{student.first_name} {student.last_name}</Link>)
							})}
						</div>
						<hr />
					</div>
				</div>
			)
		} else {
			return (
				<div></div>
			)
		}
	}
}

module.exports = StudentResults;
