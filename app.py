import logging
from flask import Flask, render_template, jsonify
from flask.ext.stormpath import StormpathError, StormpathManager, User, login_required, login_user, logout_user, user
import mapper

logging.basicConfig(
    level=logging.DEBUG,
    format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)
logger.debug("Welcome")

app = Flask(__name__)
app.config['SECRET_KEY'] = 'my-secret-key'
app.config['STORMPATH_API_KEY_FILE'] = 'apiKey-7AKT19DZWY9492JYEKXNAQ7V0.properties'
app.config['STORMPATH_APPLICATION'] = 'LibFeed'
app.config['STORMPATH_REDIRECT_URL'] = '/newsfeed'
app.config['STORMPATH_ENABLE_MIDDLE_NAME'] = False
app.config['STORMPATH_REGISTRATION_TEMPLATE'] = 'register.html'
app.config['STORMPATH_LOGIN_TEMPLATE'] = 'login.html'

stormpath_manager = StormpathManager(app)

from models import *

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/api/current_user', methods=["GET"])
@login_required
def current_user():
    # return jsonify({'user': user.given_name})
    user_test =  User(id=1, name="Pat")
    return jsonify({'user': mapper.user_to_dict(user_test)})

@app.route('/api/user/<id>', methods=["GET"])
@login_required
def get_user(id):
    # user = User.query.filter_by(id=user_id)
    # return jsonify({'user': mapper.user_to_dict(User.query.filter_by(id=id).first())})
    user_test =  User(id=1, name="Pat")
    return jsonify({'user': mapper.user_to_dict(user_test)})

@app.route('/', defaults={'path': ''})

@app.route('/<path:path>')
def index(path):
    return render_template('index.html', user=user)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
