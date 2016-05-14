"""empty message

Revision ID: cea743fa0b3a
Revises: c8e52abbc4a6
Create Date: 2016-05-14 12:57:17.385985

"""

# revision identifiers, used by Alembic.
revision = 'cea743fa0b3a'
down_revision = 'c8e52abbc4a6'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('student', sa.Column('email', sa.String(length=50), nullable=True))
    op.add_column('student', sa.Column('password', sa.String(length=128), nullable=True))
    op.add_column('student', sa.Column('username', sa.String(length=64), nullable=True))
    op.alter_column('student', 'first_name',
               existing_type=sa.VARCHAR(length=256),
               nullable=True)
    op.alter_column('student', 'last_name',
               existing_type=sa.VARCHAR(length=256),
               nullable=True)
    op.create_index(op.f('ix_student_email'), 'student', ['email'], unique=True)
    op.create_index(op.f('ix_student_username'), 'student', ['username'], unique=True)
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_student_username'), table_name='student')
    op.drop_index(op.f('ix_student_email'), table_name='student')
    op.alter_column('student', 'last_name',
               existing_type=sa.VARCHAR(length=256),
               nullable=False)
    op.alter_column('student', 'first_name',
               existing_type=sa.VARCHAR(length=256),
               nullable=False)
    op.drop_column('student', 'username')
    op.drop_column('student', 'password')
    op.drop_column('student', 'email')
    ### end Alembic commands ###