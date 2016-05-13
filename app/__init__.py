import logging, urllib2, json
from flask import Flask, render_template, jsonify
from flask.ext.stormpath import StormpathManager, user
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import and_
from flask.ext.script import Manager


logging.basicConfig(
    level=logging.DEBUG,
    format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)

app.config.from_object('config')

stormpath_manager = StormpathManager(app)

manager = Manager(app)
db = SQLAlchemy(app)

from models import *

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

from app.admin.api import api as api_module
app.register_blueprint(api_module)

@manager.command
def add_books():
    logger.debug("add books")
    app.config['SQLALCHEMY_ECHO'] = True
    with open("scrape.csv") as data_file:
        for line in data_file:
            logger.debug(line)
            parts = line.split(',')
            isbn = parts[0]
            if isbn:
                x = urllib2.urlopen("https://www.googleapis.com/books/v1/volumes?q=isbn:{0}&key=AIzaSyAJc0gefPcK1rjswykfixo5oyqVzOCGuWo".format(isbn)).read()
                y = json.loads(x)
                logger.debug(y)
                if 'items' in y:
                    if y['items']:
                        z = y['items'][0]['volumeInfo']
                        if 'description' in z:
                            description = z['description']
                            logger.debug(description)
                        else:
                            description = ''
                        if 'publishedDate' in z:
                            published_date = z['publishedDate']
                        else:
                            published_date = ''
                        if 'image' in z:
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
                        book = Book(isbn=isbn, synopsis=description, img=image, page_count=page_count, author=authors[0], genre=categories[0])
                        try:
                            db.session.add(book)
                            db.session.commit()
                        except:
                            pass

@app.route('/', defaults={'path': ''})

@app.route('/<path:path>')
def index(path):
    if hasattr(user, 'given_name'):
        cur_user =  Student.query.filter(and_(Student.first_name==user.given_name, Student.last_name==user.surname)).first()
    else:
        cur_user=''
    return render_template('index.html', user=cur_user)
