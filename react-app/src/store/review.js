//ACTION TYPE
const GET_REVIEWS = "reviews/GET_REVIEWS";
const GET_SINGLE_REVIEW = "reviews/GET_SINGLE_REVIEW";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

//ACTION CREATORS
const loadAllReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

const loadSingleReview = (review) => ({
  type: GET_SINGLE_REVIEW,
  review,
});

const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});

const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  review,
});

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

//THUNKS
export const getReviewsThunk = (dramaId) => async (dispatch) => {
  const response = await fetch(`/api/dramas/${dramaId}/reviews`);

  const reviews = await response.json();
  if (response.ok) {
    dispatch(loadAllReviews(reviews));
    return reviews;
  } else if (!response.ok && response.message) {
    dispatch(loadAllReviews({ Reviews: [] }));
  }
};

export const getSingleReviewThunk = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`);

  if (response.ok) {
    const review = await response.json();
    dispatch(loadSingleReview(review));
    return review;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createReviewThunk = (review) => async (dispatch) => {
  const response = await fetch(`/api/reviews/create_review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const newReview = await response.json();
    dispatch(createReview(newReview));
    return newReview;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const updateReviewThunk = (review) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${review.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const updatedReview = await response.json();
    dispatch(updateReview(updatedReview.drama_id));
    return updatedReview;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteReview(reviewId));
  } else {
    const errors = await response.json();
    return errors;
  }
};

//REDUCER
const initialState = {
  allReviews: {},
  singleReview: {},
};

const reviewsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_REVIEWS:
      newState = { ...state };
      newState.allReviews = action.reviews;
      return newState;
    case GET_SINGLE_REVIEW:
      newState = { ...state };
      newState.singleReview = action.review;
      return newState;
    case CREATE_REVIEW:
      newState = { ...state };
      newState.allReviews[action.review.id] = action.review;
      return newState;
    case UPDATE_REVIEW:
      newState = { ...state };
      newState.singleReview = action.review;
      return newState;
    case DELETE_REVIEW:
      newState = { ...state };
      delete newState.allReviews[action.reviewId];
      delete newState.singleReview;
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
