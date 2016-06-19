import datetime

from flask import Blueprint, jsonify, request, redirect, url_for
from sqlalchemy import or_, and_, update, func

from flask.ext.login import LoginManager, current_user, login_required

from boto.s3.connection import S3Connection
from boto.s3.key import Key

from application import db, mapper, logger, settings

from application.models import *

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/cur_user_newsfeed', methods=["GET"])
@login_required
def cur_user_newsfeed():
    borrows = []
    reviews = []
    for f in current_user.followees:
        followee = Student.query_by_id(f.id)
        if followee.borrows:
            cur_borrows = list(map(mapper.borrow_to_dict, followee.borrows))
            borrows += filter(lambda k: (datetime.datetime.now()-datetime.datetime.strptime(k['date_checked_out'], "%m/%d/%y")).days < 365, cur_borrows)
            for c in borrows:
                days_passed = (datetime.datetime.now()-datetime.datetime.strptime(c['date_checked_out'], "%m/%d/%y")).days
                if days_passed == 0:
                    days_passed = 'today'
                elif days_passed == 1:
                    days_passed = str(days_passed) + ' day ago'
                else:
                    days_passed = str(days_passed) + ' days ago'
                c['days_passed'] = days_passed
        if followee.reviews:
            cur_reviews = list(map(mapper.review_to_dict, followee.reviews))
            reviews += filter(lambda k: (datetime.datetime.now()-datetime.datetime.strptime(k['date'], "%m/%d/%y")).days < 365, cur_reviews)
            for r in reviews:
                days_passed = (datetime.datetime.now()-datetime.datetime.strptime(r['date'], "%m/%d/%y")).days
                if days_passed == 0:
                    days_passed = 'today'
                elif days_passed == 1:
                    days_passed = str(days_passed) + ' day ago'
                else:
                    days_passed = str(days_passed) + ' days ago'
                r['days_passed'] = days_passed
    borrows = sorted(borrows, key=lambda k: datetime.datetime.strptime(k['date_checked_out'], "%m/%d/%y"), reverse=True)
    reviews = sorted(reviews, key=lambda k: datetime.datetime.strptime(k['date'], "%m/%d/%y"), reverse=True)
    return jsonify({'borrows': borrows, 'reviews': reviews})

@api.route('/cur_user_page', methods=["GET"])
@login_required
def cur_user_page():
    return jsonify({'student': mapper.student_to_dict(current_user)})

@api.route('/return_book', methods=["POST"])
@login_required
def return_book():
    data = request.get_json()
    isbn = data['isbn']
    borrow = Borrow.query_by_isbn_id(isbn, current_user.id)
    db.session.delete(borrow)
    return_t = Return.query_by_isbn_id(isbn, current_user.id)
    if return_t:
        return_t.date_returned = datetime.datetime.now()
    else:
        return_b = Return(student_id=current_user.id, isbn=isbn, date_returned=datetime.datetime.now())
        db.session.add(return_b)
    db.session.commit()
    return 'OK'

@api.route('/student/<id>', methods=["GET"])
@login_required
def get_student(id):
    student = Student.query_by_id(id)
    follow = FolloweeFollower.query_by_id(id, current_user.id)
    follow_status = True if follow else False
    return jsonify({'student': mapper.student_to_dict(student), 'follow_status': follow_status})

@api.route('/book/<isbn>', methods=["GET"])
@login_required
def get_book(isbn):
    checked_out = False
    for b in current_user.borrows:
        if b.isbn == isbn:
            checked_out = True
    return jsonify({'book': mapper.book_to_dict(Book.query_by_isbn(isbn)), 'checked_out': checked_out, 'user': {'id': current_user.id, 'first_name': current_user.first_name, 'last_name': current_user.last_name}})

@api.route('/author/<id>', methods=["GET"])
@login_required
def get_author(id):
    return jsonify({'author': mapper.author_to_dict(Author.query_by_id(id))})

@api.route('/books', methods=["GET"])
@login_required
def get_books_by_genre():
    count = db.session.query(func.count(Book.isbn))
    count = count.scalar()
    offset = int(request.args.get('offset'))
    limit = int(request.args.get('limit'))
    genre = request.args.get('genre')
    genre = genre.replace('and', '&')
    return jsonify({'books': list(map(mapper.book_to_dict, Book.query_by_genre(genre, offset, limit))), 'count': count})

@api.route('/genres', methods=["GET"])
@login_required
def get_genres():
    return jsonify({'genres': list(map(mapper.genre_to_dict, Genre.query.all()))})

@api.route('/check_out', methods=["POST"])
@login_required
def check_out():
    data = request.get_json()
    isbn = data['isbn']
    student_id = current_user.id
    borrow = Borrow(isbn=isbn, student_id=student_id, date_checked_out=datetime.datetime.today(), due_date=(datetime.datetime.today() + datetime.timedelta(days=14)))
    db.session.add(borrow)
    db.session.commit()
    return 'OK'

@api.route('/write_review', methods=["POST"])
@login_required
def write_review():
    data = request.get_json()
    isbn = data['isbn']
    description = data['description']
    rating = data['rating']
    review = Review(description=description, rating=rating, date=datetime.datetime.today(), student_id=current_user.id, isbn=isbn)
    db.session.add(review)
    db.session.commit()
    return 'OK'

@api.route('/follow', methods=["POST"])
@login_required
def follow():
    data = request.get_json()
    followee = data['followee']
    f = FolloweeFollower(followee_id=followee, follower_id=current_user.id, date=datetime.datetime.now())
    db.session.add(f)
    db.session.commit()
    return 'OK'

@api.route('/unfollow', methods=["POST"])
@login_required
def unfollow():
    data = request.get_json()
    f = FolloweeFollower.query_by_id(data['followee'], current_user.id)
    db.session.delete(f)
    db.session.commit()
    return 'OK'

@api.route('/search_student/<search_term>', methods=["GET"])
@login_required
def search_student(search_term):
    students = list(map(mapper.student_to_dict, Student.query.filter(
        or_((func.lower(Student.first_name)+" "+func.lower(Student.last_name)).contains(search_term.lower()), func.lower(Student.first_name).contains(search_term.lower()),
        func.lower(Student.last_name).contains(search_term.lower())
        )).all()))
    return jsonify({'students': students})

@api.route('/search_book/<search_term>', methods=["GET"])
@login_required
def search_book(search_term):
    books = list(map(mapper.book_to_dict, Book.query.filter(func.lower(Book.title).contains(search_term.lower())).all()))
    return jsonify({'books': books})

@api.route('/search_author/<search_term>', methods=["GET"])
@login_required
def search_author(search_term):
    authors = list(map(mapper.author_to_dict, Author.query.filter(func.lower(Author.name).contains(search_term.lower())).all()))
    return jsonify({'authors': authors})

@api.route('/upload', methods=['POST'])
@login_required
def upload():
    data_file = request.files['file']
    file_name = data_file.filename
    conn = S3Connection(settings.AWS_ACCESS_KEY, settings.AWS_SECRET_KEY)
    bucket = conn.get_bucket('libfeed')
    k = Key(bucket)
    key_img = '{0}_{1}_{2}'.format(current_user.first_name, current_user.last_name, file_name)
    k.key = key_img
    k.set_contents_from_string(data_file.read())
    current_user.img = 'https://s3-us-west-2.amazonaws.com/libfeed/{0}'.format(key_img)
    db.session.commit()
    return redirect('/user')
