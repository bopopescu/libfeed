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
    img = db.Column(db.String(45))

class Book(db.Model):
    __tablename__ = 'book'

    isbn = db.Column(db.String(45), primary_key=True)
    title = db.Column(db.String(45))
    author = db.Column(db.String(45))
    synopsis = db.Column(db.String(256))
    img = db.Column(db.String(45))

class Relationship(db.Model):
    __tablename__ = 'relationship'

    person1 = db.Column(db.Integer, primary_key=True)
    person2 = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)

class Review(db.Model):
    __tablename__ = 'review'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(256))
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
    book_isbn = db.Column(db.String, ForeignKey('book.isbn'))
    book = orm.relationship('Book', backref='library_copies')
    person_id = db.Column(db.Integer, ForeignKey('person.id'))
    person = orm.relationship('Person', backref='library_copies')
    libary_id = db.Column(db.Integer, ForeignKey('library.id'))
    library = orm.relationship('Library', backref='borrowed_books')


class Library(db.Model):
    __tablename__ = 'library'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45))
    address = db.Column(db.String(45))
    city = db.Column(db.String(45))
    state = db.Column(db.String(45))
    zip = db.Column(db.Integer)
