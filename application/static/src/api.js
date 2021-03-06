const request = require('request');
const API = 'http://libfeed.co/api/';

function getCurUserNewsfeed(cb){
	request(API+'cur_user_newsfeed', (error, response, body) => {
		cb(error, JSON.parse(body));
	})
}

function getCurUserPage(cb){
	request(API+'cur_user_page', (error, response, body) => {
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

function follow(followee_id, cb) {
	var options = {
		url: API+'follow',
		method: 'POST',
		json: {
			"followee": followee_id
		}
	};
	request(options, (error, response, body) => {
		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
	})
}

function unfollow(followee_id, cb) {
	var options = {
		url: API+'unfollow',
		method: 'POST',
		json: {
			"followee": followee_id
		}
	};
	request(options, (error, response, body) => {
		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
	})
}

function getBook(isbn, cb){
	request(API+'book/'+isbn, (error, response, body) => {
		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
		if (!error) body = JSON.parse(body);
		cb(error, body);
	})
}

function getAuthor(id, cb){
	request(API+'author/'+id, (error, response, body) => {
		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
		if (!error) body = JSON.parse(body);
		cb(error, body);
	})
}

function getBooks(cb){
	request(API+'books', (error, response, body) => {
		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
		if (!error) body = JSON.parse(body);
		cb(error, body);
	})
}

function getBooksByGenre(limit, offset, genre, cb){
	genre = genre.replace("&", "and");
	request(`${API}books?genre=${genre}&limit=${limit}&offset=${offset}`, (error, response, body) => {
		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
		if (!error) body = JSON.parse(body);
		cb(error, body);
	})
}

function getGenres(cb){
	request(API+'genres', (error, response, body) => {
		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
		if (!error) body = JSON.parse(body);
		cb(error, body);
	})
}

function checkOut(isbn, cb) {
	var options = {
		url: API+'check_out',
		method: 'POST',
		json: {
			"isbn": isbn
		}
	};
	request(options, (error, response, body) => {
		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
	})
}

function writeReview(isbn, description, rating, cb) {
	var options = {
		url: API+'write_review',
		method: 'POST',
		json: {
			"isbn": isbn,
			"description": description,
			"rating": rating
		}
	};
	request(options, (error, response, body) => {
		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
	})
}

function searchStudent(term, cb){
	request(API+'search_student/'+term, (error, response, body) => {
		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
		if (!error) body = JSON.parse(body);
		cb(error, body);
	})
}

function searchBook(term, cb){
	request(API+'search_book/'+term, (error, response, body) => {
		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
		if (!error) body = JSON.parse(body);
		cb(error, body);
	})
}

function searchAuthor(term, cb){
	request(API+'search_author/'+term, (error, response, body) => {
		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
		if (!error) body = JSON.parse(body);
		cb(error, body);
	})
}

function returnBook(isbn){
	var options = {
		url: API+'return_book',
		method: 'POST',
		json: {
			"isbn": isbn
		}
	};
	request(options, (error, response, body) => {
		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
	})
 }

 function deleteBorrow(isbn){
 	var options = {
 		url: API+'delete_borrow',
 		method: 'POST',
 		json: {
 			"isbn": isbn
 		}
 	};
 	request(options, (error, response, body) => {
 		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
 	})
  }

  function deleteReview(id){
  	var options = {
  		url: API+'delete_review',
  		method: 'POST',
  		json: {
  			"id": id
  		}
  	};
  	request(options, (error, response, body) => {
  		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
  	})
   }

   function deleteReturn(isbn){
   	var options = {
   		url: API+'delete_return',
   		method: 'POST',
   		json: {
   			"isbn": isbn
   		}
   	};
   	request(options, (error, response, body) => {
   		error = error || (isJson(body) ? null : 'API response is not valid JSON (perhaps HTML)');
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
	getCurUserNewsfeed: getCurUserNewsfeed,
	getCurUserPage: getCurUserPage,
	getStudent: getStudent,
	getBook: getBook,
	getAuthor: getAuthor,
	getBooks: getBooks,
	getBooksByGenre: getBooksByGenre,
	searchStudent: searchStudent,
	searchBook: searchBook,
	searchAuthor: searchAuthor,
	returnBook: returnBook,
	follow: follow,
	unfollow: unfollow,
	checkOut: checkOut,
	writeReview: writeReview,
	getGenres: getGenres,
	deleteBorrow: deleteBorrow,
	deleteReturn: deleteReturn,
	deleteReview: deleteReview
}
