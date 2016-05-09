from sqlalchemy import ForeignKey, orm
from sqlalchemy.orm import relationship
import flask.ext.whooshalchemy as whooshalchemy
from app import db, app

class Student(db.Model):
    __tablename__ = 'student'
    __searchable__ = ['first_name', 'last_name']

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(45))
    last_name = db.Column(db.String(45))
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

class Teacher(db.Model):
    __tablename__ = 'teacher'
    __searchable__ = ['first_name', 'last_name']

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(45))
    last_name = db.Column(db.String(45))
    grade = db.Column(db.Integer)
    img = db.Column(db.String(256))


class Book(db.Model):
    __tablename__ = 'book'
    __searchable__ = ['title', 'author']

    isbn = db.Column(db.String(45), primary_key=True)
    title = db.Column(db.String(256))
    author = db.Column(db.String(45))
    synopsis = db.Column(db.String(3000))
    img = db.Column(db.String(256))


class FolloweeFollower(db.Model):
    __tablename__ = 'followee_follower'

    followee_id = db.Column(db.Integer, db.ForeignKey('student.id'), primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('student.id'), primary_key=True)
    date = db.Column(db.Date)


class Review(db.Model):
    __tablename__ = 'review'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(3000))
    rating = db.Column(db.Float)
    date = db.Column(db.Date)
    student_id = db.Column(db.Integer, ForeignKey('student.id'))
    student = orm.relationship('Student', backref='reviews')
    book_isbn = db.Column(db.String, ForeignKey('book.isbn'))
    book = orm.relationship('Book', backref='reviews')


class Copy(db.Model):
    __tablename__ = 'copy'

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(45))
    date_checked_out = db.Column(db.Date)
    due_date = db.Column(db.Date)
    book_isbn = db.Column(db.String, ForeignKey('book.isbn'))
    book = orm.relationship('Book', backref='current_borrows')
    student_id = db.Column(db.Integer, ForeignKey('student.id'))
    student = orm.relationship('Student', backref='current_borrows')


class History(db.Model):
    __tablename__ = 'history'

    id = db.Column(db.Integer, primary_key=True)
    date_turned_in = db.Column(db.Date)
    student_id = db.Column(db.Integer, ForeignKey('student.id'))
    person = orm.relationship('Student', backref='history')
    book_isbn = db.Column(db.String, ForeignKey('book.isbn'))
    book = orm.relationship('Book', backref='history')

whooshalchemy.whoosh_index(app, Student)
whooshalchemy.whoosh_index(app, Teacher)
whooshalchemy.whoosh_index(app, Book)
