def user_to_dict(user):
    return {
        'id': user.id,
        'name': user.name,
        'age': user.age,
        'img': user.img,
        'friends': list(map(slim_user_to_dict, user.friends)),
        'borrowed_books': list(map(slim_library_copy_to_dict, user.borrowed_books)),
        'reviews': list(map(slim_review_to_dict, user.reviews))
    }

def slim_user_to_dict(user):
    return {
        'id': user.id,
        'name': user.name,
        'img': user.img
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
        'date': str(review.date),
        'person': slim_user_to_dict(review.person),
        'book': slim_book_to_dict(review.book)
    }

def slim_review_to_dict(review):
    return {
        'id': review.id,
        'description': review.description,
        'rating': review.rating,
        'person_id': review.person.id,
        'person_name': review.person.name,
        'title': review.book.title,
        'isbn': review.book.isbn,
        'date': str(review.date)
    }

def library_copy_to_dict(library_copy):
    return {
        'id': library_copy.id,
        'status': library_copy.status,
        'date_checked_out': str(library_copy.date_checked_out),
        'due_date': str(library_copy.due_date),
        'book': slim_book_to_dict(library_copy.book),
        'person': slim_user_to_dict(library_copy.person),
        'library': slim_library_to_dict(library_copy.library)
    }

def slim_library_copy_to_dict(library_copy):
    return {
        'id': library_copy.id,
        'status': library_copy.status,
        'title': library_copy.book.title,
        'isbn': library_copy.book.isbn,
        'date_checked_out': str(library_copy.date_checked_out),
        'due_date': str(library_copy.due_date)
    }

def library_to_dict(library):
    return {
        'id': library.id,
        'name': library.name,
        'address': library.address,
        'city': library.city,
        'state': library.state,
        'zip': library.zip,
        'logo': library.logo,
        'library_copies': list(map(slim_library_copy_to_dict, library.library_copies))
    }

def slim_library_to_dict(library):
    return {
        'id': library.id,
        'name': library.name,
        'address': library.address,
        'city': library.city,
        'state': library.state,
        'zip': library.zip
    }
