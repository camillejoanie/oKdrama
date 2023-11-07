from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TextAreaField
from wtforms.validators import DataRequired, Length

from flask_wtf.file import FileRequired, FileAllowed, FileField
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class ActorForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    actor_name = StringField('actor_name', validators=[DataRequired(message="This field is required and must be at least 3 characters")])
    actor_image = FileField('actor_image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    debut_year = IntegerField('debut_year')
    bio = TextAreaField('bio')
