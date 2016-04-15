const request = require('request');
const API = 'http://localhost:5000/api/';

function getUser(cb){
	request(API+'get_user', (error, response, body) => {
		cb(error, JSON.parse(body));
	})
}

module.exports = {
	getUser: getUser
}
