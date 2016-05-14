"""empty message

Revision ID: 495d641eb390
Revises: cea743fa0b3a
Create Date: 2016-05-14 13:28:12.582727

"""

# revision identifiers, used by Alembic.
revision = '495d641eb390'
down_revision = 'cea743fa0b3a'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_student_username', table_name='student')
    op.drop_column('student', 'username')
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('student', sa.Column('username', sa.VARCHAR(length=64), autoincrement=False, nullable=True))
    op.create_index('ix_student_username', 'student', ['username'], unique=True)
    ### end Alembic commands ###
