from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db, Drama
from app.forms.drama_form import DramaForm
from .auth_routes import validation_errors_to_error_messages
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

drama_routes = Blueprint('dramas', __name__)

#GET ALL DRAMAS
@drama_routes.route('/', methods=['GET'])
def get_all_dramas():
    dramas = Drama.query.all()
    return jsonify([drama.to_dict() for drama in dramas])

#GET SINGLE DRAMA
@drama_routes.route('/<int:id>')
def get_single_drama(id):
    drama = Drama.query.get(id)
    if drama:
        return drama.to_dict()
    else:
        return {"error": "Playlist not found"}, 404
    
#CREATE A DRAMA POST
@drama_routes.route('/create_drama', methods=['POST'])
@login_required
def create_drama():
    form = DramaForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        drama_image = form.data['drama_image']
        drama_image.filename = get_unique_filename(drama_image.filename)
        upload = upload_video_link_to_s3(drama_image)

        if 'url' not in upload:
            return {'errors': [upload]}
        
        new_drama = Drama(
            drama_name = form.data['drama_name'],
            drama_image = upload['url'],
            release_date = form.data['release_date'],
            genre = form.data['genre'],
            trailer = form.data['trailer'],
            description = form.data['description']
        )
        db.session.add(new_drama)
        db.session.commit()
        return new_drama.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    
# UPDATE DRAMA POST
@drama_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_drama(id):
    form = DramaForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        drama = Drama.query.get(id)
        drama.drama_name = form.data['drama_name']
        drama.release_date = form.data['release_date']
        drama.genre = form.data['genre']
        drama.description = form.data['description']

        db.session.commit()
        return drama.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#DELETE DRAMA POST
@drama_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_drama(id):
    drama = Drama.query.get(id)
    # file_to_delete = remove_file_from_s3(drama.drama_image)
    if drama:
    # if file_to_delete:
        db.session.delete(drama)
        db.session.commit()
        return "Drama successfully deleted."
    else:
        return {'error': 'Drama does not exist'}, 404
