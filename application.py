from flask import Flask, render_template
from flask.ext.stormpath import StormpathError, StormpathManager, User, login_required, login_user, logout_user, user

application = Flask(__name__)
application.config['SECRET_KEY'] = 'my-secret-key'
application.config['STORMPATH_API_KEY_FILE'] = 'apiKey-7AKT19DZWY9492JYEKXNAQ7V0.properties'
application.config['STORMPATH_APPLICATION'] = 'LibFeed'
application.config['STORMPATH_REDIRECT_URL'] = '/newsfeed'
application.config['STORMPATH_ENABLE_MIDDLE_NAME'] = False

stormpath_manager = StormpathManager(application)

@application.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@application.route('/', defaults={'path': ''})

@application.route('/<path:path>')
def index(path):
    return render_template('index.html')

if __name__ == '__main__':
    application.run(host='0.0.0.0')
