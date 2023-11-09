import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReviewThunk } from "../../store/review";
import HeartRating from "./HeartRating";
import "./CreateReview.css";

function CreateReviewModal(props) {
  const { dramaId } = useSelector((state) => state.dramas.singleDrama);
  const { userId } = useSelector((state) => state.session.user);
  //   const userId = props.props.sessionUser;
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const [review, setReview] = useState("");
  const [hearts, setHearts] = useState("");
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  const updateDisabledState = () => {
    setIsDisabled(review.length < 4 || hearts === "");
  };

  const reviewRating = (hearts) => {
    setHearts(hearts);
    updateDisabledState();
  };

  function errorsChecked(review, hearts) {
    const errors = {};
    if (!review) errors.review = "Review is required";
    if (review.length < 6)
      errors.review = "Review must be at least 6 characters long";
    if (!hearts) errors.hearts = "Heart rating is required";

    setErrors(errors);

    return errors;
  }

  const submitReview = async (e) => {
    e.preventDefault();
    const errorsFound = errorsChecked(review, hearts);

    const formData = new FormData();

    formData.append("user_id", userId);
    formData.append("drama_id", dramaId);
    formData.append("review", review);
    formData.append("hearts", hearts);

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(createReviewThunk(formData));

      setReview("");
      setHearts("");

      closeModal();
    }

    // const newReview = {
    //   userId,
    //   dramaId,
    //   review,
    //   hearts,
    // };

    // await dispatch(createReviewThunk(dramaId, newReview)).catch(
    //   async (response) => {
    //     const data = await response.json();
    //     if (data && data.errors) {
    //       setErrors(data.errors);
    //     }
    //   }
    // );
    // reset();
    // closeModal();
  };

  const handleClose = () => {
    closeModal();
  };

  const reset = () => {
    setReview("");
    setHearts("");
  };

  return (
    <div className="entire-create-review">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <h1 className="create-review-header">
        What did you think of this K-Drama?
      </h1>
      <div className="review-container">
        <textarea
          className="create-review-textarea"
          placeholder="Write your review here..."
          onChange={(e) => {
            setReview(e.target.value);
            updateDisabledState();
          }}
          value={review}
        />
        {errors.review && <p className="error-message">{errors.review}</p>}
        <div className="create-review-hearts">
          <HeartRating
            className="heart-rating-buttons"
            onChange={reviewRating}
            value={hearts}
          />
          <div className="create-review-heart-text">Hearts</div>
        </div>
        {errors.hearts && <p className="error-message">{errors.hearts}</p>}
      </div>
      <div className="create-review-submit-button">
        <button
          className={`submit-review-button ${
            isDisabled ? "submit-review-button-disabled" : ""
          }`}
          onClick={submitReview}
          disabled={isDisabled}
        >
          Submit Your Review
        </button>
      </div>
    </div>
  );
}

export default CreateReviewModal;
