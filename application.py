from os.path import expanduser
from flask import Flask, render_template
from flask.ext.stormpath import StormpathManager

application = Flask(__name__)
application.config['SECRET_KEY'] = 'my-secret-key'
application.config['STORMPATH_API_KEY_FILE'] = expanduser('~/.apiKey-7AKT19DZWY9492JYEKXNAQ7V0.properties')
application.config['STORMPATH_APPLICATION'] = 'https://api.stormpath.com/v1/applications/7drBzhkK5DTxkqUgQE5T6I'
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
