import logging
from flask import Flask, render_template, jsonify
from flask.ext.stormpath import StormpathManager, user
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import and_

logging.basicConfig(
    level=logging.DEBUG,
    format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)

app.config.from_object('config')

stormpath_manager = StormpathManager(app)

db = SQLAlchemy(app)

from models import *

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

from app.admin.api import api as api_module
app.register_blueprint(api_module)

@app.route('/', defaults={'path': ''})

@app.route('/<path:path>')
def index(path):
    if hasattr(user, 'given_name'):
        cur_user =  Student.query.filter(and_(Student.first_name==user.given_name, Student.last_name==user.surname)).first()
    else:
        cur_user=''
    return render_template('index.html', user=cur_user)
