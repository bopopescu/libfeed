var React = require('react');

class Home extends React.Component {
	render() {
		return (
			<div className="home-page">
				<div className="container-fluid">
					<div className="row">
						<div className="quote-body col-xs-12 col-sm-12 col-md-6">
							<p className="book-quote">“Reading one book is like eating one potato chip.”</p>
							<p className="quoted-by"> - Diane Duane, <span className="italic">So You Want to Be a Wizard</span></p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = Home;
