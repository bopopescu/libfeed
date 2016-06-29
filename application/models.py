from flask.ext.login import UserMixin, current_user

from werkzeug.security import generate_password_hash, check_password_hash

from sqlalchemy import ForeignKey, orm, func, and_
from sqlalchemy.orm import relationship

from application import db, application, login_manager, logger


@login_manager.user_loader
def load_user(user_id):
    return Student.query.get(int(user_id))

class Student(UserMixin, db.Model):
    __tablename__ = 'student'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, index=True)
    password = db.Column(db.String(128))
    first_name = db.Column(db.String(256), default='')
    last_name = db.Column(db.String(256), default='')
    grade = db.Column(db.Integer)
    img = db.Column(db.String(256))
    followers = orm.relationship('Student',
                               secondary="followee_follower",
                               primaryjoin=("Student.id==followee_follower.c.followee_id"),
                               secondaryjoin=("Student.id==followee_follower.c.follower_id"))
    followees = orm.relationship('Student',
                               secondary="followee_follower",
                               primaryjoin=("Student.id==followee_follower.c.follower_id"),
                               secondaryjoin=("Student.id==followee_follower.c.followee_id"))

    def __init__(self, email, password, first_name, last_name, grade):
        self.email = email
        self.password = generate_password_hash(password)
        self.first_name = first_name
        self.last_name = last_name
        self.grade = grade
        logger.debug('here')
        self.img = 'https://s3-us-west-2.amazonaws.com/libfeed/default-medium.png'

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return unicode(self.id)

    @staticmethod
    def query_by_id(id):
        return Student.query.filter(Student.id == id).first()

    @staticmethod
    def query_by_name(name):
        return Student.query.filter('{0} {1}'.format(func.lower(Student.first_name), func.lower(Student.last_name)) == func.lower(name)).first()

    @staticmethod
    def login_user(email, password):
        s = Student.query.filter(Student.email == email).first()
        if s:
            if s.check_password(password):
                return s
            else:
                return None
        else:
            return None

class Book(db.Model):
    __tablename__ = 'book'

    isbn = db.Column(db.String(256), primary_key=True)
    title = db.Column(db.String(256), nullable=False)
    synopsis = db.Column(db.String(3000))
    img = db.Column(db.String(256))
    publication_date = db.Column(db.Date)
    page_count = db.Column(db.Integer)
    authors = orm.relationship('Author', secondary="book_author",
                             backref="books")
    genres = orm.relationship('Genre', secondary="book_genre",
                             backref="books")

    @staticmethod
    def query_by_isbn(isbn):
        return Book.query.filter(Book.isbn==isbn).first()

    @staticmethod
    def query_by_genre(genre_d, offset, limit):
        genre_f = Genre.query.filter(func.lower(Genre.description)==func.lower(genre_d)).first()
        return Book.query.filter(Book.genres.contains(genre_f)).slice(offset, offset+limit)


class Author(db.Model):
    __tablename__ = 'author'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False)

    @staticmethod
    def query_by_id(id):
        return Author.query.filter(Author.id==id).first()


class BookAuthor(db.Model):
    __tablename__ = 'book_author'

    author_id = db.Column(db.Integer, db.ForeignKey('author.id'), primary_key=True)
    book_isbn = db.Column(db.String(256), db.ForeignKey('book.isbn'), primary_key=True)


class Genre(db.Model):
    __tablename__ = 'genre'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(256), nullable=False)


class BookGenre(db.Model):
    __tablename__ = 'book_genre'

    genre_id = db.Column(db.Integer, db.ForeignKey('genre.id'), primary_key=True)
    book_isbn = db.Column(db.String(256), db.ForeignKey('book.isbn'), primary_key=True)


class FolloweeFollower(db.Model):
    __tablename__ = 'followee_follower'

    followee_id = db.Column(db.Integer, db.ForeignKey('student.id'), primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('student.id'), primary_key=True)
    date = db.Column(db.Date)

    @staticmethod
    def query_by_id(followee_id, follower_id):
        return FolloweeFollower.query.filter(and_(FolloweeFollower.followee_id==followee_id, FolloweeFollower.follower_id==follower_id)).first()

class Borrow(db.Model):
    __tablename__ = 'borrow'

    isbn = db.Column(db.String(256), db.ForeignKey('book.isbn'), primary_key=True)
    book = orm.relationship('Book')
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), primary_key=True)
    student = orm.relationship('Student', backref='borrows')
    date_checked_out = db.Column(db.Date)
    due_date = db.Column(db.Date)

    @staticmethod
    def query_by_isbn_id(isbn, id):
        return Borrow.query.filter(and_(Borrow.isbn==isbn, Borrow.student_id==id)).first()

class Review(db.Model):
    __tablename__ = 'review'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(3000), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)
    student_id = db.Column(db.Integer, ForeignKey('student.id'), nullable=False)
    student = orm.relationship('Student', backref='reviews')
    isbn = db.Column(db.String, ForeignKey('book.isbn'), nullable=False)
    book = orm.relationship('Book', backref='reviews')

    @staticmethod
    def query_by_id(id):
        return Review.query.filter(Review.id==id).first()

class Return(db.Model):
    __tablename__ = 'return'

    isbn = db.Column(db.String(256), db.ForeignKey('book.isbn'), primary_key=True)
    book = orm.relationship('Book')
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), primary_key=True)
    student = orm.relationship('Student', backref='returns')
    date_returned = db.Column(db.Date, nullable=False)

    @staticmethod
    def query_by_isbn_id(isbn, id):
        return Return.query.filter(and_(Return.isbn==isbn, Return.student_id==id)).first()
