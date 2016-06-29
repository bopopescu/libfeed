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
						<div className="row">
							<div className={data.students.length ? "col-xs-12 col-sm-12 col-md-6 search-results-area" : "none"}>
								<h3>Search Results for <span className="result-found">“{this.props.params.searchTerm}”</span></h3>
								<hr />
								<h6>Students</h6>
								<div className="panel-body list-group">
									{data.students.slice(0, 20).map( student => {
										return (
											<div>
												<Link to={'/students/'+student.id} className="list-group-item"><span className="thumbnail-follower"><img src={student.img} /></span>{student.first_name} {student.last_name}</Link>
											</div>
										)
									})}
								</div>
							</div>
							<div className={data.students.length ? "none" : "col-xs-12 col-sm-12 col-md-6 search-results-area"}>
								<h3>No Results Found for <span className="result-found">“{this.props.params.searchTerm}”</span></h3>
							</div>
						</div>
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
