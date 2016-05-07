var React = require('react');

class About extends React.Component {
	render() {
		return (
			<div className="about-page">
				<div className="container-fluid">
					<h5>About LibFeed</h5>
					<div class="about-description">
						<p>LibFeed helps students at Ann Richards to find books to read.
						   Students can browse what books are available in their library,
						   see what books their friends have read, and read reviews by
						   other students at their school.
						</p>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = About;
