import datetime

def student_to_dict(student):
    return {
        'id': student.id,
        'first_name': student.first_name,
        'last_name': student.last_name,
        'grade': student.grade,
        'img': student.img,
        'followees': list(map(slim_student_to_dict, student.followees)),
        'followers': list(map(slim_student_to_dict, student.followers)),
        'borrows': list(map(slim_borrow_to_dict, student.borrows)),
        'returns': list(map(slim_return_to_dict, student.returns)),
        'reviews': list(map(slim_review_to_dict, student.reviews))
    }

def slim_student_to_dict(student):
    return {
        'id': student.id,
        'first_name': student.first_name,
        'last_name': student.last_name,
        'img': student.img
    }

def book_to_dict(book):
    return {
        'isbn': book.isbn,
        'title': book.title,
        'authors': list(map(slim_author_to_dict, book.authors)),
        'genres': list(map(slim_genre_to_dict, book.genres)),
        'synopsis': book.synopsis,
        'img': book.img,
        'publication_date': book.publication_date.strftime("%-m/%d/%y") if book.publication_date else '',
        'page_count': book.page_count,
        'reviews': list(map(slim_review_to_dict, book.reviews))
    }

def slim_book_to_dict(book):
    return {
        'isbn': book.isbn,
        'title': book.title,
        'publication_date': book.publication_date.strftime("%-m/%d/%y") if book.publication_date else '',
        'page_count': book.page_count,
        'img': book.img
    }

def review_to_dict(review):
    return {
        'id': review.id,
        'description': review.description,
        'rating': review.rating,
        'date': review.date.strftime("%-m/%d/%y"),
        'student': slim_student_to_dict(review.student),
        'book': slim_book_to_dict(review.book)
    }

def slim_review_to_dict(review):
    return {
        'id': review.id,
        'description': review.description,
        'rating': review.rating,
        'title': review.book.title,
        'isbn': review.book.isbn,
        'date': review.date.strftime("%-m/%d/%y"),
        'student_id': review.student.id,
        'student_name': review.student.first_name + ' ' + review.student.last_name
    }

def borrow_to_dict(borrow):
    return {
        'isbn': borrow.isbn,
        'book': slim_book_to_dict(borrow.book),
        'student_id': borrow.student_id,
        'student': slim_student_to_dict(borrow.student),
        'date_checked_out': borrow.date_checked_out.strftime("%-m/%d/%y"),
        'due_date': borrow.due_date.strftime("%-m/%d/%y")
    }

def slim_borrow_to_dict(borrow):
    return {
        'isbn': borrow.isbn,
        'student_id': borrow.student_id,
        'date_checked_out': borrow.date_checked_out.strftime("%-m/%d/%y"),
        'due_date': borrow.due_date.strftime("%-m/%d/%y"),
        'title': borrow.book.title
    }

def return_to_dict(return_b):
    return {
        'isbn': return_b.isbn,
        'book': slim_book_to_dict(return_b.book),
        'student_id': return_b.student_id,
        'student': slim_student_to_dict(return_b.student),
        'date_returned': return_b.date_returned.strftime("%-m/%d/%y")
    }

def slim_return_to_dict(return_b):
    return {
        'isbn': return_b.isbn,
        'student_id': return_b.student_id,
        'date_returned': return_b.date_returned.strftime("%-m/%d/%y"),
        'title': return_b.book.title
    }

def author_to_dict(author):
    return {
        'id': author.id,
        'name': author.name,
        'books': list(map(slim_book_to_dict, author.books))
    }

def slim_author_to_dict(author):
    return {
        'id': author.id,
        'name': author.name
    }

def genre_to_dict(genre):
    return {
        'id': genre.id,
        'description': genre.description,
        'books': list(map(slim_book_to_dict, genre.books))
    }

def slim_genre_to_dict(genre):
    return {
        'id': genre.id,
        'description': genre.description
    }
