def user_to_dict(user):
    return {
        'id': user.id,
        'name': user.name,
        'age': user.age,
        'img': user.img,
        # 'friends': list(map(user_list_to_dict, user.friends)),
        'borrowed_books': list(map(library_copy_list_to_dict, user.borrowed_books)),
        'reviews': list(map(review_list_to_dict, user.reviews))
    }

def user_list_to_dict(user):
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
        'reviews': list(map(review_list_to_dict, book.reviews))
    }

def book_list_to_dict(book):
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
        # 'date': review.date,
        'person': user_list_to_dict(review.person),
        'book': book_list_to_dict(review.book)
    }

def review_list_to_dict(review):
    return {
        'id': review.id,
        'description': review.description,
        'person_id': review.person.id,
        'person_name': review.person.name
        # 'date': review.date
    }

def library_copy_to_dict(library_copy):
    return {
        'id': library_copy.id,
        'status': library_copy.status,
        # 'date_checked_out': library_copy.date_checked_out,
        'book': book_list_to_dict(library_copy.book),
        'person': user_list_to_dict(library_copy.person),
        'library': library_list_to_dict(library_copy.library)
    }

def library_copy_list_to_dict(library_copy):
    return {
        'id': library_copy.id,
        'status': library_copy.status,
        'title': library_copy.book.title
        # 'date_checked_out': library_copy.date_checked_out
    }

def library_to_dict(library):
    return {
        'id': library.id,
        'name': library.name,
        'address': library.address,
        'city': library.city,
        'state': library.state,
        'zip': library.zip,
        'library_copies': list(map(library_copy_list_to_dict, library.library_copies))
    }

def library_list_to_dict(library):
    return {
        'id': library.id,
        'name': library.name,
        'address': library.address,
        'city': library.city,
        'state': library.state,
        'zip': library.zip
    }
