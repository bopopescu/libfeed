"""empty message

Revision ID: 00eb94d908ee
Revises: 94aa7f1565fd
Create Date: 2016-05-11 22:26:48.127937

"""

# revision identifiers, used by Alembic.
revision = '00eb94d908ee'
down_revision = '94aa7f1565fd'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('return', sa.Column('date_returned', sa.Date(), nullable=True))
    op.drop_column('return', 'date_turned_in')
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('return', sa.Column('date_turned_in', sa.DATE(), autoincrement=False, nullable=True))
    op.drop_column('return', 'date_returned')
    ### end Alembic commands ###