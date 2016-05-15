import logging, urllib2, json

from flask import Flask, render_template, jsonify, request, redirect, url_for, session, flash
from flask.ext.script import Manager

from flask.ext.login import LoginManager, login_user, logout_user, current_user, login_required

from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import and_

from app import settings

# logging.basicConfig(
#     level=logging.DEBUG,
#     format='%(levelname)s: %(message)s')
# logger = logging.getLogger(__name__)

app = Flask(__name__)

app.config.from_object('config')
app.secret_key = settings.SECRET_KEY

login_manager = LoginManager()

login_manager.init_app(app)

manager = Manager(app)
db = SQLAlchemy(app)

from models import *

login_manager.login_view = 'login'

@app.route('/register' , methods=['GET','POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    user = Student(request.form['email'], request.form['password'], request.form['first_name'], request.form['last_name'], request.form['grade'])
    db.session.add(user)
    db.session.commit()
    return redirect(url_for('login'))

@app.route('/login',methods=['GET','POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    email = request.form['email']
    password = request.form['password']
    registered_user = Student.query.filter_by(email=email,password=password).first()
    if registered_user is None:
        flash('Email or Password is invalid' , 'error')
        return redirect(url_for('login'))
    login_user(registered_user)
    flash('Logged in successfully')
    return redirect(request.args.get('next') or url_for('index'))

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

from app.admin.api import api as api_module
app.register_blueprint(api_module)

@manager.command
def add_books():
    app.config['SQLALCHEMY_ECHO'] = True
    with open("scrape.csv") as data_file:
        for line in data_file:
            parts = line.split(',')
            title = parts[1].strip()
            author = parts[2].rstrip().strip()
            if author and title:
                author = author.replace(' ', '+')
                title = title.replace(' ', '+')
                x = "https://www.googleapis.com/books/v1/volumes?q={0}+inauthor:{1}&key=AIzaSyAJc0gefPcK1rjswykfixo5oyqVzOCGuWo".format(title, author)
                x = urllib2.urlopen(x).read()
                y = json.loads(x)
                if 'items' in y:
                    if y['items']:
                        z = y['items'][0]['volumeInfo']
                        if 'title' in z:
                            title = z['title']
                        else:
                            title = ''
                        if 'industryIdentifiers' in z:
                            isbn = z['industryIdentifiers'][0]['identifier']
                        else:
                            isbn = ''
                        if 'description' in z:
                            description = z['description']
                        else:
                            description = ''
                        if 'publishedDate' in z:
                            published_date = z['publishedDate']
                        else:
                            published_date = ''
                        if 'imageLinks' in z:
                            image = z['imageLinks']['thumbnail']
                        else:
                            image = ''
                        if 'pageCount' in z:
                            page_count = z['pageCount']
                        else:
                            page_count = 0
                        if 'authors' in z:
                            authors = z['authors']
                        else:
                            authors = ['']
                        if 'categories' in z:
                            categories = z['categories']
                        else:
                            categories = ['']
                        book = Book(isbn=isbn, synopsis=description, img=image, page_count=page_count, title=title)
                        book_test = Book.query.filter_by(isbn=isbn).first()
                        if not book_test:
                            try:
                                db.session.merge(book)
                                db.session.commit()
                            except:
                                pass
                        for author in authors:
                            author_test = Author.query.filter_by(name=author).first()
                            if not author_test:
                                author_insert = Author(name=author)
                                db.session.merge(author_insert)
                                db.session.commit()
                                author_test = Author.query.filter_by(name=author).first()
                            author_id = author_test.id
                            book_author = BookAuthor(author_id=author_id, book_isbn=isbn)
                            try:
                                db.session.merge(book_author)
                                db.session.commit()
                            except:
                                pass
                        for genre in categories:
                            genre_test = Genre.query.filter_by(description=genre).first()
                            if not genre_test:
                                genre_insert = Genre(description=genre)
                                try:
                                    db.session.merge(genre_insert)
                                    db.session.commit()
                                except:
                                    pass
                                genre_test = Genre.query.filter_by(description=genre).first()
                            genre_id= genre_test.id
                            book_genre = BookGenre(genre_id=genre_id, book_isbn=isbn)
                            try:
                                db.session.merge(book_genre)
                                db.session.commit()
                            except:
                                pass

@app.route('/', defaults={'path': ''})

@app.route('/<path:path>')
def index(path):
    return render_template('index.html')
