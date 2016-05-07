import logging, mapper, os
from datetime import datetime
from flask import Flask, render_template, jsonify
from flask.ext.stormpath import StormpathError, StormpathManager, User, login_required, login_user, logout_user, user
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import or_, and_

logging.basicConfig(
    level=logging.DEBUG,
    format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'my-secret-key'
app.config['STORMPATH_API_KEY_FILE'] = 'apiKey-7AKT19DZWY9492JYEKXNAQ7V0.properties'
app.config['STORMPATH_APPLICATION'] = 'LibFeed'
app.config['STORMPATH_REDIRECT_URL'] = '/newsfeed'
app.config['STORMPATH_ENABLE_MIDDLE_NAME'] = False
app.config['STORMPATH_REGISTRATION_TEMPLATE'] = 'register.html'
app.config['STORMPATH_LOGIN_TEMPLATE'] = 'login.html'

stormpath_manager = StormpathManager(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:password@localhost/db'
db = SQLAlchemy(app)

from models import *

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/api/current_user', methods=["GET"])
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

@app.route('/api/student/<id>', methods=["GET"])
@login_required
def get_user(id):
    return jsonify({'student': mapper.student_to_dict(Student.query.filter_by(id=id).first())})

@app.route('/api/book/<isbn>', methods=["GET"])
@login_required
def get_book(isbn):
    return jsonify({'book': mapper.book_to_dict(Book.query.filter_by(isbn=isbn).first())})

@app.route('/api/search/<search_term>', methods=["GET"])
def search(search_term):
    users = list(map(mapper.student_to_dict, Student.query.filter((Student.first_name+" "+Student.last_name)==search_term).all()))
    books = list(map(mapper.book_to_dict, Book.query.filter(or_(Book.title==search_term, Book.author==search_term.lower())).all()))
    return jsonify({'users': users, 'books': books})

@app.route('/', defaults={'path': ''})

@app.route('/<path:path>')
def index(path):
    if hasattr(user, 'given_name'):
        cur_user =  Student.query.filter(and_(Student.first_name==user.given_name, Student.last_name==user.surname)).first()
    else:
        cur_user=''
    return render_template('index.html', user=cur_user)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
