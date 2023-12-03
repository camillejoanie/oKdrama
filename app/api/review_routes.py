from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.exc import IntegrityError
from app.models import db, Review, Drama, User
from app.forms.review_form import ReviewForm
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)

# #GET ALL REVIEWS
# @review_routes.route('/', methods=['GET'])
# def get_all_reviews():
#     reviews = Review.query.filter_by(drama_id = id).order_by(Review.created_at)
#     if not reviews:
#         message = "There are currently no reviews"
#         return message
#     else:
#         result = [review.to_dict() for review in reviews]
#         return result

# # GET ALL REVIEWS
# @review_routes.route('/<int:drama_id>/reviews', methods=['GET'])
# def get_all_reviews(id):
#     reviews = Review.query.filter_by(drama_id=id).order_by(Review.created_at)
#     if not reviews:
#         message = "There are currently no reviews"
#         return jsonify(message=message)
#     else:
#         result = [review.to_dict() for review in reviews]
#         return jsonify(result)

#GET SINGLE REVIEW
@review_routes.route('/<int:id>')
def get_single_review(id):
    review = Review.query.get(id)
    if review:
        return review.to_dict()
    else:
        return {"error": "Review not found"}, 404
    
# CREATE A REVIEW
@review_routes.route('/<int:dramaId>/reviews', methods=['POST'])
@login_required
def create_review(dramaId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = Review(
            user_id=current_user.id,
            drama_id=dramaId,
            review=form.data['review'],
            hearts=form.data['hearts']
        )

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict(), 201
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# @review_routes.route('/<int:dramaId>/reviews', methods=['POST'])
# @login_required
# def create_review(dramaId):
#     form = ReviewForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         new_review = Review(
#             user_id=current_user.id,
#             drama_id=dramaId,
#             review=form.data['review'],
#             hearts=form.data['hearts']
#         )

#         db.session.add(new_review)
#         db.session.commit()
#         return new_review.to_dict()
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    
#UPDATE REVIEW
@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review.query.get(id)
        review.review_text = form.data['review']
        review.hearts = form.data['hearts']

        db.session.commit()
        return review.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#DELETE REVIEW
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return "Review successfully deleted."
    else:
        return {'error': 'Review does not exist'}, 404
