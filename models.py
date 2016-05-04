from sqlalchemy import ForeignKey, orm
from sqlalchemy.orm import relationship
from flask.ext.sqlalchemy import SQLAlchemy
from app import db

class Person(db.Model):
    __tablename__ = 'person'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45))
    username = db.Column(db.String(45))
    password = db.Column(db.String(45))
    age = db.Column(db.Integer)
    img = db.Column(db.String(256))
    friends = orm.relationship('Person',
                               secondary="friendship",
                               primaryjoin=("Person.id==friendship.c.person1_id"),
                               secondaryjoin=("Person.id==friendship.c.person2_id"))

class Book(db.Model):
    __tablename__ = 'book'

    isbn = db.Column(db.String(45), primary_key=True)
    title = db.Column(db.String(256))
    author = db.Column(db.String(45))
    synopsis = db.Column(db.String(3000))
    img = db.Column(db.String(256))


class Friendship(db.Model):
    __tablename__ = 'friendship'

    person1_id = db.Column(db.Integer, db.ForeignKey('person.id'), primary_key=True)
    person2_id = db.Column(db.Integer, db.ForeignKey('person.id'), primary_key=True)
    date = db.Column(db.Date)

class Review(db.Model):
    __tablename__ = 'review'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(3000))
    rating = db.Column(db.Float)
    date = db.Column(db.Date)
    person_id = db.Column(db.Integer, ForeignKey('person.id'))
    person = orm.relationship('Person', backref='reviews')
    book_isbn = db.Column(db.String, ForeignKey('book.isbn'))
    book = orm.relationship('Book', backref='reviews')


class LibraryCopy(db.Model):
    __tablename__ = 'library_copy'

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(45))
    date_checked_out = db.Column(db.Date)
    due_date = db.Column(db.Date)
    book_isbn = db.Column(db.String, ForeignKey('book.isbn'))
    book = orm.relationship('Book', backref='library_copies')
    person_id = db.Column(db.Integer, ForeignKey('person.id'))
    person = orm.relationship('Person', backref='borrowed_books')
    library_id = db.Column(db.Integer, ForeignKey('library.id'))
    library = orm.relationship('Library', backref='library_copies')


class Library(db.Model):
    __tablename__ = 'library'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    address = db.Column(db.String(256))
    city = db.Column(db.String(45))
    state = db.Column(db.String(45))
    zip = db.Column(db.Integer)
    logo = db.Column(db.String(256))
