import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/review";
import OpenModalButton from "../OpenModalButton";
import "./DramaReviews.css";

function DramaReviews() {
  const { dramaId } = useParams();
  const dispatch = useDispatch();
  const reviewObj = useSelector((state) => state.reviews.allReviews);
  const userId = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.session.allUsers);
  const owner = useSelector((state) => state.dramas.singleDrama.user_id);
  const reviewArr = Object.values(reviewObj);
  const currUser = userId?.id;

  useEffect(() => {
    dispatch(getReviewsThunk(dramaId));
  }, [dispatch, dramaId]);

  const isOwner = owner === currUser;
  const isLoggedIn = !!userId;

  return (
    <div className="entire-review-list">
      {isOwner && (
        <>
          {reviewArr.length === 0 && (
            <div className="no-review-text">Sorry, no reviews yet. 😔</div>
          )}
          {reviewArr.length > 0 && (
            <div className="drama-reviews-container">
              {reviewArr.map((review) => {
                const reviewDate = new Date(review.created_at);
                const year = reviewDate.getFullYear();
                const month = reviewDate.toLocaleString("default", {
                  month: "long",
                });

                return (
                  <div key={review.id} className="review-item">
                    <p>{review.user_id.first_name}</p>
                    <p>
                      {month}, {year}
                    </p>
                    <p>{review.review_text}</p>
                    <p>Hearts: {review.hearts}</p>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      {!isOwner && (
        <>
          {reviewArr.length === 0 && (
            <div className="no-review-text">
              {isLoggedIn
                ? "Be the first to comment! ☺"
                : "Log in to be the first to review!"}
            </div>
          )}
          {reviewArr.length > 0 && (
            <div className="drama-reviews-container">
              {reviewArr.map((review) => {
                const reviewDate = new Date(review.created_at);
                const year = reviewDate.getFullYear();
                const month = reviewDate.toLocaleString("default", {
                  month: "long",
                });

                return (
                  <div key={review.id} className="review-item">
                    <p>{review.user_id.first_name}</p>
                    <p>
                      {month}, {year}
                    </p>
                    <p>{review.review_text}</p>
                    <p>Hearts: {review.hearts}</p>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DramaReviews;
