const request = require('request');
const API = 'http://localhost:5000/api/';

function getCurrentUser(cb){
	request(API+'current_user', (error, response, body) => {
		cb(error, JSON.parse(body));
	})
}

function getUser(id, cb){
	request(API+'user/'+id, (error, response, body) => {
		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
		if (!error) body = JSON.parse(body);
		cb(error, body);
	})
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = {
	getCurrentUser: getCurrentUser,
	getUser: getUser
}
