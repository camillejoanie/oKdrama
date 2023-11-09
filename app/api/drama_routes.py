from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Drama, Review, DramaActor, Actor
from app.forms.drama_form import DramaForm
from app.forms.drama_actor_form import DramaActorForm
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
        return {"error": "Drama not found"}, 404
    
#CREATE A DRAMA POST
@drama_routes.route('/create_drama', methods=['POST'])
@login_required
def create_drama():
    form = DramaForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        drama_image = form.data['drama_image']
        drama_image.filename = get_unique_filename(drama_image.filename)
        upload = upload_file_to_s3(drama_image)

        if 'url' not in upload:
            return {'errors': [upload]}
        
        new_drama = Drama(
            user_id = form.data['user_id'],
            drama_name = form.data['drama_name'],
            drama_image = upload['url'],
            release_year = form.data['release_year'],
            genre = form.data['genre'],
            trailer = form.data['trailer'],
            description = form.data['description']
        )
        db.session.add(new_drama)
        db.session.commit()
        return new_drama.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    
#UPDATE DRAMA POST
@drama_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_drama(id):
    form = DramaForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        drama = Drama.query.get(id)
        drama.drama_name = form.data['drama_name']
        drama.release_year = form.data['release_year']
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
    
# GET ALL REVIEWS
# @drama_routes.route('/<int:id>/reviews', methods=['GET'])
# def get_all_reviews(id):
#     reviews = Review.query.filter_by(drama_id=id).order_by(Review.created_at)
#     if not reviews:
#         message = "There are currently no reviews"
#         return jsonify(message=message)
#     else:
#         return jsonify([review.to_dict() for review in reviews])
@drama_routes.route('/<int:id>/reviews', methods=['GET'])
def get_all_reviews(id):
    reviews = Review.query.filter_by(drama_id=id).all()
    return jsonify([review.to_dict() for review in reviews])

#GET DRAMA ACTORS
@drama_routes.route('/<int:id>/get-actors')
def get_drama_actors(id):
    actors = DramaActor.query.filter_by(drama_id=id).all()
    return jsonify([actor.to_dict() for actor in actors])

#ADD DRAMA ACTORS
@drama_routes.route('/<int:id>/add-actor', methods=['POST'])
@login_required
def add_drama_actors(id):
    form = DramaActorForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        drama_id = form.data['drama_id']
        actor_id = form.data['actor_id']

        drama = Drama.query.get(drama_id)
        actor = Actor.query.get(actor_id)

        if not drama:
            return {"error": "Drama not found"}, 404
        if not actor:
            return {"error": "Actor not found"}, 404
        
        new_drama_actor = DramaActor(
            drama_id=drama_id,
            actor_id=actor_id
        )

        db.session.add(new_drama_actor)
        db.session.commit()
        return new_drama_actor.to_dict(), 201
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400