"""empty message

Revision ID: a729bd43c472
Revises: 78361309c2b1
Create Date: 2016-05-11 22:21:04.131301

"""

# revision identifiers, used by Alembic.
revision = 'a729bd43c472'
down_revision = '78361309c2b1'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('borrow',
    sa.Column('book_isbn', sa.String(length=45), nullable=False),
    sa.Column('student_id', sa.Integer(), nullable=False),
    sa.Column('date_checked_out', sa.Date(), nullable=True),
    sa.Column('due_date', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['book_isbn'], ['book.isbn'], ),
    sa.ForeignKeyConstraint(['student_id'], ['student.id'], ),
    sa.PrimaryKeyConstraint('book_isbn', 'student_id')
    )
    op.create_table('return',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date_turned_in', sa.Date(), nullable=True),
    sa.Column('student_id', sa.Integer(), nullable=True),
    sa.Column('book_isbn', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['book_isbn'], ['book.isbn'], ),
    sa.ForeignKeyConstraint(['student_id'], ['student.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('history')
    op.drop_table('book_student')
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('book_student',
    sa.Column('book_isbn', sa.VARCHAR(length=45), autoincrement=False, nullable=False),
    sa.Column('student_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('date_checked_out', sa.DATE(), autoincrement=False, nullable=True),
    sa.Column('due_date', sa.DATE(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['book_isbn'], [u'book.isbn'], name=u'book_student_book_isbn_fkey'),
    sa.ForeignKeyConstraint(['student_id'], [u'student.id'], name=u'book_student_student_id_fkey'),
    sa.PrimaryKeyConstraint('book_isbn', 'student_id', name=u'book_student_pkey')
    )
    op.create_table('history',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('date_turned_in', sa.DATE(), autoincrement=False, nullable=True),
    sa.Column('student_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('book_isbn', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['book_isbn'], [u'book.isbn'], name=u'history_book_isbn_fkey'),
    sa.ForeignKeyConstraint(['student_id'], [u'student.id'], name=u'history_student_id_fkey'),
    sa.PrimaryKeyConstraint('id', name=u'history_pkey')
    )
    op.drop_table('return')
    op.drop_table('borrow')
    ### end Alembic commands ###
