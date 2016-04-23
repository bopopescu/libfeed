const request = require('request');
const API = 'http://localhost:5000/api/';

function getCurrentUser(cb){
	request(API+'current_user', (error, response, body) => {
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
	getCurrentUser: getCurrentUser,
	getUser: getUser
}
