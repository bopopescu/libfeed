def user_to_dict(user):
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
        'synopsis': book.synopsis
    }
