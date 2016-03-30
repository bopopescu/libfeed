from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from app import db


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45))
    username = db.Column(db.String(45))
    password = db.Column(db.String(45))


class Book(db.Model):
    __tablename__ = 'book'

    isbn = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(45))
    author = db.Column(db.String(45))


class Relationship(db.Model):
    __tablename__ = 'relationship'

    user1 = db.Column(db.Integer, primary_key=True)
    user2 = db.Column(db.Integer, primary_key=True)


class Review(db.Model):
    __tablename__ = 'review'

    id = db.Column(db.Integer, primary_key=True)
    user = orm.relationship('User', backref='reviews')
    description = db.Column(db.String(256))
    date = db.Column(db.Date)


class BorrowedBook(db.Model):
    __tablename__ = 'borrowed_book'

    id = db.Column(db.Integer, primary_key=True)
    user = orm.relationship('User', backref='borrowed_books')
    review = orm.relationship('Review')
    date_checked_out = db.Column(db.Date)
    date_returned = db.Column(db.Date)
    library = orm.relationship('Library', backref='borrowed_books')


class Library(db.Model):
    __tablename__ = 'library'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45))
    address = db.Column(db.String(45))
    city = db.Column(db.String(45))
    state = db.Column(db.String(45))
    zip = db.Column(db.Integer)
    books = orm.relationship('Book', backref='books')
