import datetime

from flask import Blueprint, jsonify, request
from flask.ext.stormpath import login_required, user
from sqlalchemy import or_, and_, update

from app import db, mapper, logger

from app.models import Student, Book, Copy, FolloweeFollower

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/cur_user_newsfeed', methods=["GET"])
@login_required
def cur_user_newsfeed():
    cur_user =  Student.query.filter(and_(Student.first_name==user.given_name, Student.last_name==user.surname)).first()
    current_borrows = []
    reviews = []
    for f in cur_user.followees:
        followee = Student.query.filter_by(id=f.id).first()
        if followee.current_borrows:
            cur_current_borrows = list(map(mapper.copy_to_dict, followee.current_borrows))
            current_borrows += filter(lambda k: (datetime.datetime.now()-datetime.datetime.strptime(k['date_checked_out'], "%Y-%m-%d")).days < 365, cur_current_borrows)
        if followee.reviews:
            cur_reviews = list(map(mapper.review_to_dict, followee.reviews))
            reviews += filter(lambda k: (datetime.datetime.now()-datetime.datetime.strptime(k['date'], "%Y-%m-%d")).days < 365, cur_reviews)
    current_borrows = sorted(current_borrows, key=lambda k: datetime.datetime.strptime(k['date_checked_out'], "%Y-%m-%d"))
    reviews = sorted(reviews, key=lambda k: datetime.datetime.strptime(k['date'], "%Y-%m-%d"))
    return jsonify({'current_borrows': current_borrows, 'reviews': reviews})

@api.route('/cur_user_page', methods=["GET"])
@login_required
def cur_user_page():
    return jsonify({'student': mapper.student_to_dict(Student.query.filter(and_(Student.first_name==user.given_name, Student.last_name==user.surname)).first())})

@api.route('/return_book', methods=["POST"])
@login_required
def return_book():
    data = request.get_json()
    id = data['id']
    copy = Copy.query.filter_by(id=id).first()
    copy.student_id = None
    copy.status = 'available'
    db.session.commit()
    return 'OK'

@api.route('/student/<id>', methods=["GET"])
@login_required
def get_student(id):
    student = Student.query.filter_by(id=id).first()
    follow_status = False
    for f in student.followers:
        if f.first_name==user.given_name and f.last_name==user.surname:
            follow_status = True
    return jsonify({'student': mapper.student_to_dict(student), 'follow_status': follow_status})

@api.route('/book/<isbn>', methods=["GET"])
@login_required
def get_book(isbn):
    s = Student.query.filter(and_(Student.first_name==user.given_name, Student.last_name==user.surname)).first()
    checked_out = False
    available = 0
    for b in s.current_borrows:
        if b.book_isbn == isbn:
            checked_out = True
    copies = Copy.query.filter_by(book_isbn=isbn).all()
    for c in copies:
        if c.status == 'available':
            available += 1
    return jsonify({'book': mapper.book_to_dict(Book.query.filter_by(isbn=isbn).first()), 'checked_out': checked_out, 'available': available})

@api.route('/check_out', methods=["POST"])
@login_required
def check_out():
    data = request.get_json()
    isbn = data['isbn']
    copy = Copy.query.filter_by(book_isbn=isbn, status='available').first()
    s = Student.query.filter(and_(Student.first_name==user.given_name, Student.last_name==user.surname)).first().id
    copy.student_id = s
    copy.date_checked_out = datetime.datetime.today()
    copy.due_date = datetime.datetime.today() + datetime.timedelta(days=14)
    copy.status = 'checked_out'
    db.session.commit()
    return 'OK'

@api.route('/write_review', methods=["POST"])
@login_required
def write_review():
    data = request.get_json()
    isbn = data['isbn']
    description = data['description']
    rating = data['rating']
    s = Student.query.filter(and_(Student.first_name==user.given_name, Student.last_name==user.surname)).first().id
    b = Book.query.filter_by(isbn=isbn)
    r = Review(id=6, description=description, rating=rating, date=datetime.datetime.today(), student_id=s, book_isbn=isbn)
    db.session.add(r)
    db.session.commit()
    return 'OK'

@api.route('/follow', methods=["POST"])
@login_required
def follow():
    data = request.get_json()
    followee = data['followee']
    follower = Student.query.filter(and_(Student.first_name==user.given_name, Student.last_name==user.surname)).first().id
    f = FolloweeFollower(followee_id=followee, follower_id=follower, date=datetime.datetime.now())
    db.session.add(f)
    db.session.commit()
    return 'OK'

@api.route('/unfollow', methods=["POST"])
@login_required
def unfollow():
    data = request.get_json()
    followee = data['followee']
    follower = Student.query.filter(and_(Student.first_name==user.given_name, Student.last_name==user.surname)).first().id
    f = FolloweeFollower.query.filter_by(followee_id=followee, follower_id=follower).first()
    db.session.delete(f)
    db.session.commit()
    return 'OK'

@api.route('/search/<search_term>', methods=["GET"])
def search(search_term):
    students = list(map(mapper.student_to_dict, Student.query.filter((Student.first_name+" "+Student.last_name)==search_term).all()))
    books = list(map(mapper.book_to_dict, Book.query.filter(or_(Book.title==search_term, Book.author==search_term.lower())).all()))
    return jsonify({'students': students, 'books': books})
