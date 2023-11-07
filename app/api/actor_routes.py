from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Actor
from app.forms.actor_form import ActorForm
from .auth_routes import validation_errors_to_error_messages
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

actor_routes = Blueprint('actors', __name__)

#GET ALL ACTORS
@actor_routes.route('/', methods=['GET'])
def get_all_actors():
    actors = Actor.query.all()
    return jsonify([actor.to_dict() for actor in actors])

# GET SINGLE ACTOR
@actor_routes.route('/<int:id>', methods=['GET'])
def get_single_actor(id):
    actor = Actor.query.get(id)
    if actor:
        return actor.to_dict()
    else:
        return {"error": "Actor not found"}, 404

# CREATE AN ACTOR
@actor_routes.route('/create_actor', methods=['POST'])
@login_required
def create_actor():
    form = ActorForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        actor_image = form.data['actor_image']
        actor_image.filename = get_unique_filename(actor_image.filename)
        upload = upload_file_to_s3(actor_image)

        if 'url' not in upload:
            return {'errors': [upload]}

        new_actor = Actor(
            user_id=form.data['user_id'],
            actor_name=form.data['actor_name'],
            actor_image=upload['url'],
            debut_year=form.data['debut_year'],
            bio=form.data['bio']
        )
        db.session.add(new_actor)
        db.session.commit()
        return new_actor.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# UPDATE AN ACTOR
@actor_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_actor(id):
    form = ActorForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        actor = Actor.query.get(id)
        actor.actor_name = form.data['actor_name']
        actor.debut_year = form.data['debut_year']
        actor.bio = form.data['bio']

        db.session.commit()
        return actor.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# DELETE AN ACTOR
@actor_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_actor(id):
    actor = Actor.query.get(id)
    if actor:
        db.session.delete(actor)
        db.session.commit()
        return "Actor successfully deleted."
    else:
        return {'error': 'Actor not found'}, 404