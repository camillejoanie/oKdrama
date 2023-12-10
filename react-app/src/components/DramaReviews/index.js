import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/review";
import OpenModalButton from "../OpenModalButton";
import "./DramaReviews.css";

function DramaReviews() {
  const { dramaId } = useParams();
  const dispatch = useDispatch();
  const reviewObj = useSelector((state) => state.reviews.allReviews);
  const dramaObj = useSelector((state) => state.dramas.singleDrama);
  const userId = useSelector((state) => state.session.user);
  // const users = useSelector((state) => state.session.allUsers);
  const owner = useSelector((state) => state.dramas.singleDrama.user_id);
  const reviewArr = Object.values(reviewObj);
  const currUser = userId?.id;
  const [key, setKey] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getReviewsThunk(dramaId)).then(() => setIsLoaded(true));
  }, [dispatch, dramaId]);

  const sortedReviews = Array.isArray(reviewArr)
    ? [...reviewArr].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  const isOwner = owner === currUser;
  const isLoggedIn = !!userId;

  const handleSubmit = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    isLoaded && (
      <div className="entire-review-list" key={key}>
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
                      <p className="review-user">{review?.User?.first_name}</p>
                      <p>
                        {month}, {year}
                      </p>
                      <p className="review-text">{review.review_text}</p>
                      <div className="review-hearts">
                        Hearts: {review.hearts}
                      </div>
                      {/* {userId && (
                        <div className="review-update-button">
                          {review.user_id === userId.id && (
                            <OpenModalButton
                              buttonText="Update"
                              modalComponent={
                                <UpdateReview
                                  review={review}
                                  userId={dramaId.id}
                                  dramaId={dramaId.id}
                                />
                              }
                            />
                          )}
                        </div>
                      )} */}
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
                      {/* <p>{review.user_id.first_name}</p> */}
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
    )
  );
}

export default DramaReviews;
