from .db import db, environment, SCHEMA, add_prefix_for_prod

class DramaActor(db.Model):
    __tablename__ = 'drama_actors'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    drama_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("dramas.id")))
    actor_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("actors.id")))

    drama = db.relationship("Drama", back_populates="drama_actor")
    actor = db.relationship("Actor", back_populates="drama_actor")

    def to_dict(self):
        return {
            'id': self.id,
            'drama_id': self.drama_id,
            'actor_id': self.actor_id
        }