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
        'current_borrows': list(map(slim_copy_to_dict, student.current_borrows)),
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

def copy_to_dict(copy):
    return {
        'id': copy.id,
        'status': copy.status,
        'date_checked_out': copy.date_checked_out.strftime("%-m/%d/%y"),
        'due_date': copy.due_date.strftime("%-m/%d/%y"),
        'book': slim_book_to_dict(copy.book),
        'student': slim_student_to_dict(copy.student)
    }

def slim_copy_to_dict(copy):
    return {
        'id': copy.id,
        'status': copy.status,
        'title': copy.book.title,
        'author': copy.book.author,
        'isbn': copy.book.isbn,
        'date_checked_out': copy.date_checked_out.strftime("%-m/%d/%y"),
        'due_date': copy.due_date.strftime("%-m/%d/%y")
    }
