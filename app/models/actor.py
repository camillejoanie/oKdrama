from .db import db, environment, SCHEMA, add_prefix_for_prod

class Actor(db.Model):
    __tablename__ = 'actors'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    actor_name = db.Column(db.String, nullable=False)
    actor_image = db.Column(db.String, nullable=False)
    debut_year = db.Column(db.Integer, nullable=False)
    bio = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    user = db.relationship("User", back_populates="actor")
    drama_actor = db.relationship("DramaActor", back_populates="actor")
    like = db.relationship('Like', back_populates="actor")

    def to_dict(self):
        return {
            'id': self.id,
            'actor_name': self.actor_name,
            'actor_image': self.actor_image,
            'debut_year': self.debut_year,
            'bio': self.bio,
            'user_id': self.user_id,
        }