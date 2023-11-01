from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    drama_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("dramas.id")))
    actor_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("actors.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    drama = db.relationship("Drama", back_populates="like")
    actor = db.relationship("Actor", back_populates="like")
    user = db.relationship("User", back_populates="like")

    def to_dict(self):
        return {
            'id': self.id,
            'drama_id': self.drama_id,
            'actor_id': self.actor_id,
            'user_id': self.user_id
        }