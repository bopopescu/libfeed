from application import application, logger
from flask import jsonify
from flask.ext.stormpath import StormpathError, StormpathManager, User, login_required, login_user, logout_user, user

@application.route('/api/get_user')
@login_required
def get_user(body):
    return jsonify({'user': user})
