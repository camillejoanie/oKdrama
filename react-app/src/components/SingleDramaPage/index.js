import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, NavLink } from "react-router-dom";
import { getSingleDramaThunk, getDramaActorsThunk } from "../../store/drama";
import DramaReviews from "../DramaReviews";
import CreateReviewModal from "../CreateReviewModal";
import OpenModalButton from "../OpenModalButton";
import "./SingleDrama.css";

function extractVideoIdFromURL(url) {
  const regex = /(?:https:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;

  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}

function calculateAverageRating(reviews) {
  if (reviews.length === 0) return 0;

  const totalRating = reviews.reduce((sum, review) => sum + review.hearts, 0);
  const averageRating = totalRating / reviews.length;

  return averageRating;
}

function SingleDramaPage() {
  const dispatch = useDispatch();
  const { dramaId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [displayType, setDisplayType] = useState("reviews");

  const sessionUser = useSelector((state) => state.session.user);
  const dramaObj = useSelector((state) => state.dramas.singleDrama);
  const reviewObj = useSelector((state) => state.reviews.allReviews);
  const dramaActorsObj = useSelector((state) => state.dramas.dramaActors);
  const owner = useSelector(
    (state) => state.dramas.singleDrama?.user_id || null
  );
  const dramaArr = Object.values(dramaObj);
  const reviewArr = Object.values(reviewObj);
  const dramaActorsArr = Object.values(dramaActorsObj);

  useEffect(() => {
    dispatch(getSingleDramaThunk(dramaId));
    dispatch(getDramaActorsThunk(dramaId));
    setIsLoaded(true);
  }, [dispatch, dramaId]);

  if (submitted) {
    dispatch(getSingleDramaThunk(dramaObj.id));
    setSubmitted(false);
  }

  if (!dramaObj) {
    return <Redirect to="/" />;
  }

  let currUser;
  if (sessionUser && sessionUser.id) {
    currUser = sessionUser.id;
  }

  const isOwner = owner === currUser;

  const averageRating = calculateAverageRating(reviewArr);

  const featureComingSoon = () => {
    alert("Feature coming soon!");
  };

  if (!dramaObj.trailer) {
    return (
      <div className="entire-single-drama">
        <div className="single-drama-body">
          <div className="single-drama-top">
            <img className="single-drama-img" src={dramaObj.drama_image} />
            <div className="single-drama-info">
              <div className="single-drama-rating">
                Rating:{" "}
                {reviewArr.length === 0 ? "New" : averageRating.toFixed(1)}
              </div>
              <h1 className="single-drama-title">{dramaObj.drama_name}</h1>
              <div className="single-drama-desc">{dramaObj.description}</div>
              <div className="single-drama-releaseyear">
                Released: {dramaObj.release_year}
              </div>
              <div className="single-drama-genre">Genre: {dramaObj.genre}</div>
              <div className="single-drama-actors">
                <h2>Actors:</h2>
                <ul>
                  {dramaActorsArr.map((dramaActor) => (
                    <li key={dramaActor.id}>{dramaActor.actor.actor_name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="single-drama-buttons">
            <div className="toggle-buttons">
              <button onClick={() => setDisplayType("reviews")}>Reviews</button>
              <button onClick={() => setDisplayType("trailer")}>Trailer</button>
            </div>
          </div>
          <div className="single-drama-review-trailer">
            {displayType === "reviews" && (
              <div className="single-drama-reviews">
                {!isOwner && (
                  <div className="single-drama-create-review">
                    {/* <OpenModalButton
                      className="single-drama-create-button"
                      buttonText="Write a Review"
                      modalComponent={
                        <CreateReviewModal
                          dramaId={dramaArr.drama_id}
                          submitted={() => setSubmitted(true)}
                        />
                      }
                    /> */}
                    <button
                      className="single-drama-create-button"
                      onClick={featureComingSoon}
                    >
                      Write a Review
                    </button>
                  </div>
                )}
                <div className="single-drama-review-container">
                  <DramaReviews />
                </div>
              </div>
            )}
            {displayType === "trailer" && (
              <div className="single-drama-notrailer">
                Sorry, No trailer available!
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const videoId = extractVideoIdFromURL(dramaObj.trailer);

  return (
    <div className="entire-single-drama">
      <div className="single-drama-body">
        <div className="single-drama-top">
          <img className="single-drama-img" src={dramaObj.drama_image} />
          <div className="single-drama-info">
            <div className="single-drama-rating">
              Rating:{" "}
              {reviewArr.length === 0 ? "New" : averageRating.toFixed(1)}
            </div>
            <h1 className="single-drama-title">{dramaObj.drama_name}</h1>
            <div className="single-drama-desc">{dramaObj.description}</div>
            <div className="single-drama-releaseyear">
              Released: {dramaObj.release_year}
            </div>
            <div className="single-drama-genre">Genre: {dramaObj.genre}</div>
            <div className="single-drama-actors">
              <h2>Actors:</h2>
              <ul>
                {dramaActorsArr.map((dramaActor) => (
                  <li key={dramaActor.id}>{dramaActor?.Actor?.actor_name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="single-drama-buttons">
          <div className="toggle-buttons">
            <button onClick={() => setDisplayType("reviews")}>Reviews</button>
            <button onClick={() => setDisplayType("trailer")}>Trailer</button>
          </div>
        </div>
        <div className="single-drama-review-trailer">
          {displayType === "reviews" && (
            <div className="single-drama-reviews">
              {!isOwner && (
                <div className="single-drama-create-review">
                  {/* <OpenModalButton
                    className="single-drama-create-button"
                    buttonText="Write a Review"
                    modalComponent={
                      <CreateReviewModal
                        dramaId={dramaArr.drama_id}
                        submitted={() => setSubmitted(true)}
                      />
                    }
                  /> */}
                  <button
                    className="single-drama-create-button"
                    onClick={featureComingSoon}
                  >
                    Write a Review
                  </button>
                </div>
              )}
              <div className="single-drama-review-container">
                <DramaReviews />
              </div>
            </div>
          )}
          {displayType === "trailer" && (
            <div className="single-drama-trailer">
              {dramaObj.trailer ? (
                <iframe
                  className="single-drama-video"
                  width="640"
                  height="360"
                  src={`https://www.youtube.com/embed/${extractVideoIdFromURL(
                    dramaObj.trailer
                  )}`}
                  frameBorder="0"
                  allowFullScreen
                  title="YouTube Video"
                ></iframe>
              ) : (
                <div className="single-drama-notrailer">
                  Sorry, No trailer available!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleDramaPage;
