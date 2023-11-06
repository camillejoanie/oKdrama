from .db import db, environment, SCHEMA, add_prefix_for_prod

class Drama(db.Model):
    __tablename__ = 'dramas'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    drama_name = db.Column(db.String(255), nullable=False)
    drama_image = db.Column(db.String, nullable=False)
    release_year = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String, nullable=False)
    trailer = db.Column(db.String)
    description = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    user = db.relationship("User", back_populates="drama")
    drama_actor = db.relationship("DramaActor", back_populates="drama")
    like = db.relationship("Like", back_populates="drama")
    review = db.relationship("Review", back_populates="drama")

    def to_dict(self):
        return {
            'id': self.id,
            'drama_name': self.drama_name,
            'drama_image': self.drama_image,
            'release_year': self.release_year,
            'genre': self.genre,
            'trailer': self.trailer,
            'description': self.description,
            'user_id': self.user_id,
        }
