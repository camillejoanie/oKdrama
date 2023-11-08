from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, SelectField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError, NumberRange

class ReviewForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    drama_id = IntegerField('drama_id', validators=[DataRequired()])
    review = TextAreaField('review', validators=[DataRequired(), Length(min=1, max=255)])
    hearts = IntegerField('hearts', validators=[DataRequired(), NumberRange(min=0, max=5)])