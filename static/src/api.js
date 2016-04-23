const request = require('request');
const API = 'http://localhost:5000/api/';

function getLoggedInUser(cb){
	request(API+'get_logged_in_user', (error, response, body) => {
		cb(error, JSON.parse(body));
	})
}

function getUser(id, cb){
	request(API+'user/'+id, (error, response, body) => {
		body = JSON.parse(body);
		cb(error, body);
	})
}

module.exports = {
	getLoggedInUser: getLoggedInUser,
	getUser: getUser
}
