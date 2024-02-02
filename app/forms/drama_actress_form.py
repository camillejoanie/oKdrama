from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class DramaActressForm(FlaskForm):
    drama_id = IntegerField('drama_id', validators=[DataRequired()])
    actress_id = IntegerField('actress_id', validators=[DataRequired()])