from .db import db, environment, SCHEMA, add_prefix_for_prod

class DramaActress(db.Model):
    __tablename__ = 'drama_actresses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    drama_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("dramas.id")))
    actress_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("actresses.id")))

    drama = db.relationship("Drama", back_populates="drama_actress")
    actress = db.relationship("Actress", back_populates="drama_actress")

    def to_dict(self):
        return {
            'id': self.id,
            'drama_id': self.drama_id,
            'actress_id': self.actress_id
        }