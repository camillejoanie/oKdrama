from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, SelectField, TextAreaField
from wtforms.validators import DataRequired, Length

from flask_wtf.file import FileRequired, FileAllowed, FileField
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class DramaForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    drama_name = StringField('drama_name', validators=[DataRequired(message="This field is required and must be at least 2 characters"), Length(min=2, max=255)])
    drama_image = FileField('drama_image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    release_date = IntegerField('release_date', validators=[DataRequired(message="This field is required and must be an integer")])
    genre = SelectField('Genre', choices=[('Drama', 'Drama'), ('Romance', 'Romance'), ('Comedy', 'Comedy'), ('Action', 'Action')], validators=[DataRequired()])
    trailer = FileField('Trailer URL', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    description = TextAreaField('Description', validators=[DataRequired()])
