from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.exc import IntegrityError
from app.models import db, Review, Drama, User
from app.forms.review_form import ReviewForm
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)

# #GET ALL REVIEWS
@review_routes.route('/<int:dramaId>', methods=['GET'])
def get_reviews(dramaId):
    drama = Drama.query.get(dramaId)
    if not drama:
        return {'errors': 'Drama does not exist'}, 404
    
    reviews = Review.query.filter_by(drama_id=dramaId).all()
    return jsonify([review.to_dict() for review in reviews])

#GET SINGLE REVIEW
# @review_routes.route('/<int:id>')
# def get_single_review(id):
#     review = Review.query.get(id)
#     if review:
#         return review.to_dict()
#     else:
#         return {"error": "Review not found"}, 404
    
# CREATE A REVIEW
@review_routes.route('/<int:dramaId>', methods=['POST'])
@login_required
def create_review(dramaId):
    user = User.query.get(current_user.id)
    drama = Drama.query.get(dramaId)
    if not drama:
        return {'errors': 'Review does not exist'}, 404
    
    data = request.get_json()
    data_text = data.get('review')
    form = ReviewForm(data={'text': data_text})
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review (
            drama_id = dramaId,
            user_id = user.id,
            text = form.data['text']
        )
        db.session.add(new_review)
        db.session.commit()

        return jsonify(new_review.to_dict()), 201
    return {'errors': form.errors}, 400
    
#UPDATE REVIEW
@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def update_review(reviewId):
    review = Review.query.get(reviewId)

    if not review:
        return {'error': 'Review does not exist'}, 404
    
    if review.user_id != current_user.id:
        return {'error': 'Unauthorized user'}, 401
    
    data = request.get_json()
    data_text = data.get('review')

    form = ReviewForm(data={'text': data_text})
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review.text = form.data['text']

        new_review = {}
        copy = review.to_dict()
        copy['User'] = review.user.to_dict()
        new_review[str(review.id)] = copy
        
        db.session.commit()
        return jsonify(new_review), 200

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#DELETE REVIEW
@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(reviewId):
    review = Review.query.get(reviewId)
    if not review:
        return {'error': 'Review does not exist'}, 404
    if review.user_id != current_user.id:
        return {'error': 'Unauthorized user'}, 401

    db.session.delete(review)
    db.session.commit()

    return {'message': 'Review successfully deleted'}
