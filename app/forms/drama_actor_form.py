from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class DramaActorForm(FlaskForm):
    drama_id = IntegerField('drama_id', validators=[DataRequired()])
    actor_id = IntegerField('actor_id', validators=[DataRequired()])