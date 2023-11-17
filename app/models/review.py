from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    drama_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('dramas.id')), nullable=False)
    hearts = db.Column(db.Integer, nullable=False)
    review_text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="review")
    drama= db.relationship("Drama", back_populates="review")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'drama_id': self.drama_id,
            'hearts': self.hearts,
            'review_text': self.review_text,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }