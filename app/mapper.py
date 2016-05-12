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
        'author': book.author,
        'synopsis': book.synopsis,
        'img': book.img,
        'reviews': list(map(slim_review_to_dict, book.reviews))
    }

def slim_book_to_dict(book):
    return {
        'isbn': book.isbn,
        'title': book.title,
        'author': book.author,
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
        'author': review.book.author,
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
        'title': borrow.book.title,
        'author': borrow.book.author
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
        'title': return_b.book.title,
        'author': return_b.book.author
    }
