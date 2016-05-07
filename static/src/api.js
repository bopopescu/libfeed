const request = require('request');
const API = 'http://localhost:5000/api/';

function getCurrentUser(cb){
	request(API+'current_user', (error, response, body) => {
		cb(error, JSON.parse(body));
	})
}

function getStudent(id, cb){
	request(API+'student/'+id, (error, response, body) => {
		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
		if (!error) body = JSON.parse(body);
		cb(error, body);
	})
}

function getBook(isbn, cb){
	request(API+'book/'+isbn, (error, response, body) => {
		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
		if (!error) body = JSON.parse(body);
		cb(error, body);
	})
}

function search(term, cb){
	request(API+'search/'+term, (error, response, body) => {
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
	getStudent: getStudent,
	getBook: getBook,
	search: search
}
