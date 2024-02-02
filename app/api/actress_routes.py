from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Actress
from app.forms.actress_form import ActressForm
from .auth_routes import validation_errors_to_error_messages
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

actress_routes = Blueprint('actresses', __name__)

#GET ALL ACTRESSES
@actress_routes.route('/', methods=['GET'])
def get_all_actresses():
    actresses = Actress.query.all()
    return jsonify([actress.to_dict() for actress in actresses])

# GET SINGLE ACTRESS
@actress_routes.route('/<int:id>', methods=['GET'])
def get_single_actress(id):
    actress = Actress.query.get(id)
    if actress:
        return actress.to_dict()
    else:
        return {"error": "Actress not found"}, 404

# CREATE AN ACTRESS
@actress_routes.route('/create_actress', methods=['POST'])
@login_required
def create_actress():
    form = ActressForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        actress_image = form.data['actress_image']
        actress_image.filename = get_unique_filename(actress_image.filename)
        upload = upload_file_to_s3(actress_image)

        if 'url' not in upload:
            return {'errors': [upload]}

        new_actress = Actress(
            user_id=form.data['user_id'],
            actress_name=form.data['actress_name'],
            actress_image=upload['url'],
            debut_year=form.data['debut_year'],
            bio=form.data['bio']
        )
        db.session.add(new_actress)
        db.session.commit()
        return new_actress.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# UPDATE AN ACTRESS
@actress_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_actress(id):
    form = ActressForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        actress = Actress.query.get(id)
        actress.actress_name = form.data['actress_name']
        actress.debut_year = form.data['debut_year']
        actress.bio = form.data['bio']

        db.session.commit()
        return actress.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# DELETE AN ACTRESS
@actress_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_actress(id):
    actress = Actress.query.get(id)
    if actress:
        db.session.delete(actress)
        db.session.commit()
        return "Actress successfully deleted."
    else:
        return {'error': 'Actress not found'}, 404