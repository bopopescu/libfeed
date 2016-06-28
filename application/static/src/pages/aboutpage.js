var React = require('react');

class About extends React.Component {
	render() {
		return (
			<div className="about-page">
				<div className="container-fluid">
					<div className="row">
						<div className="col-xs-6 about-section">
							<h5 className="about-title">About LibFeed</h5>
							<div className="about-description">
								<p>LibFeed helps students at Ann Richards to find books to read.
								   Students can browse what books are available in their library,
								   see what books their friends have read, and read reviews by
								   other students at their school.
								</p>
							</div>
							<p className="site-creator">Created by <a href="http://leslierice.tech/">Leslie Rice</a></p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = About;
