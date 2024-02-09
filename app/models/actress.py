from .db import db, environment, SCHEMA, add_prefix_for_prod

class Actress(db.Model):
    __tablename__ = 'actresses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    actress_name = db.Column(db.String, nullable=False)
    actress_image = db.Column(db.String, nullable=False)
    debut_year = db.Column(db.Integer, nullable=False)
    bio = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    user = db.relationship("User", back_populates="actress")
    drama_actress = db.relationship("DramaActress", back_populates="actress")
    like = db.relationship('Like', back_populates="actress")

    def to_dict(self):
        return {
            'id': self.id,
            'actress_name': self.actress_name,
            'actress_image': self.actress_image,
            'debut_year': self.debut_year,
            'bio': self.bio,
            'user_id': self.user_id,
        }