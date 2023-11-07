from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, SelectField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError

from flask_wtf.file import FileRequired, FileAllowed, FileField
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class DramaForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    drama_name = StringField('drama_name', validators=[DataRequired(message="This field is required and must be at least 2 characters"), Length(min=2, max=255)])
    drama_image = FileField('drama_image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])

    def validate_release_year(form, field):
        release_year = str(field.data)  # Convert the integer to a string
        if not release_year.isdigit() or len(release_year) != 4:
            raise ValidationError("Release year must be a 4-digit integer.")

    release_year = IntegerField('release_year', validators=[DataRequired(message="This field is required and must be only 4 integers."), validate_release_year])
    genre = StringField('genre', validators=[DataRequired()])
    trailer = StringField('trailer')
    description = TextAreaField('description', validators=[DataRequired()])
