from datetime import datetime

from flask import Blueprint, jsonify
from flask.ext.stormpath import login_required, user
from sqlalchemy import or_, and_

from app import db, mapper

from app.models import Student, Book

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/current_user', methods=["GET"])
@login_required
def current_user():
    cur_user =  Student.query.filter(and_(Student.first_name==user.given_name, Student.last_name==user.surname)).first()
    current_borrows = []
    reviews = []
    for f in cur_user.followees:
        followee = Student.query.filter_by(id=f.id).first()
        if followee.current_borrows:
            cur_current_borrows = list(map(mapper.copy_to_dict, followee.current_borrows))
            current_borrows += filter(lambda k: (datetime.now()-datetime.strptime(k['date_checked_out'], "%Y-%m-%d")).days < 365, cur_current_borrows)
        if followee.reviews:
            cur_reviews = list(map(mapper.review_to_dict, followee.reviews))
            reviews += filter(lambda k: (datetime.now()-datetime.strptime(k['date'], "%Y-%m-%d")).days < 365, cur_reviews)
    current_borrows = sorted(current_borrows, key=lambda k: datetime.strptime(k['date_checked_out'], "%Y-%m-%d"))
    reviews = sorted(reviews, key=lambda k: datetime.strptime(k['date'], "%Y-%m-%d"))
    return jsonify({'current_borrows': current_borrows, 'reviews': reviews})

@api.route('/student/<id>', methods=["GET"])
@login_required
def get_user(id):
    return jsonify({'student': mapper.student_to_dict(Student.query.filter_by(id=id).first())})

@api.route('/book/<isbn>', methods=["GET"])
@login_required
def get_book(isbn):
    return jsonify({'book': mapper.book_to_dict(Book.query.filter_by(isbn=isbn).first())})

@api.route('/search/<search_term>', methods=["GET"])
def search(search_term):
    students = list(map(mapper.student_to_dict, Student.query.filter((Student.first_name+" "+Student.last_name)==search_term).all()))
    books = list(map(mapper.book_to_dict, Book.query.filter(or_(Book.title==search_term, Book.author==search_term.lower())).all()))
    return jsonify({'students': students, 'books': books})
