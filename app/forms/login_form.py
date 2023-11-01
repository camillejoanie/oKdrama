from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    username_or_email = field.data
    user = User.query.filter((User.username == username_or_email) | (User.email == username_or_email)).first()
    if not user:
        raise ValidationError('Username or Email provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    username_or_email = form.data['username_or_email']
    user = User.query.filter((User.username == username_or_email) | (User.email == username_or_email)).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    username_or_email = StringField('Username or Email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])