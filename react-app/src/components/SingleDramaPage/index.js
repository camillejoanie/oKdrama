import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, NavLink } from "react-router-dom";
import { getSingleDramaThunk, getDramaActorsThunk } from "../../store/drama";
import DramaReviews from "../DramaReviews";
import CreateReviewModal from "../CreateReviewModal";
import "./SingleDrama.css";
import OpenModalButton from "../OpenModalButton";

function extractVideoIdFromURL(url) {
  const regex = /(?:https:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;

  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}

function SingleDramaPage() {
  const dispatch = useDispatch();
  const { dramaId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [displayType, setDisplayType] = useState("reviews"); // "reviews" or "trailer"

  const sessionUser = useSelector((state) => state.session.user);
  const dramaObj = useSelector((state) => state.dramas.singleDrama);
  const reviewObj = useSelector((state) => state.reviews.allReviews);
  const dramaActorsObj = useSelector((state) => state.dramas.dramaActors);
  const owner = useSelector((state) => state.dramas.singleDrama.user_id);
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

  if (!dramaObj.trailer) {
    return (
      <div className="entire-single-drama">
        <div className="single-drama-body">
          <img className="single-drama-img" src={dramaObj.drama_image} />
          <div className="single-drama-info">
            <div className="single-drama-rating">**Rating**</div>
            <h1 className="single-drama-title">{dramaObj.drama_name}</h1>
            <div className="single-drama-desc">{dramaObj.description}</div>
            <div className="single-drama-releaseyear">
              Released: {dramaObj.release_year}
            </div>
            <div className="single-drama-genre">Genre: {dramaObj.genre}</div>
            <p>Sorry, no trailer!</p>
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
            <div className="single-drama-rating">**Rating**</div>
            <h1 className="single-drama-title">{dramaObj.drama_name}</h1>
            <div className="single-drama-desc">{dramaObj.description}</div>
            <div className="single-drama-releaseyear">
              Released: {dramaObj.release_year}
            </div>
            <div className="single-drama-genre">Genre: {dramaObj.genre}</div>
            <div className="single-drama-actors">
              <h2>Actors:</h2>
              <ul>
                {dramaActorsArr.map((actor) => (
                  <li key={actor.id}>{actor.actor_name}</li>
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
                  <OpenModalButton
                    className="single-drama-create-button"
                    buttonText="Write a Review"
                    modalComponent={
                      <CreateReviewModal
                        dramaId={dramaArr.drama_id}
                        submitted={() => setSubmitted(true)}
                      />
                    }
                  />
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
