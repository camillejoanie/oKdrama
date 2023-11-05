import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { getSingleDramaThunk } from "../../store/drama";
import "./SingleDrama.css";

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
  const sessionUser = useSelector((state) => state.session.user);
  const dramaObj = useSelector((state) => state.dramas.singleDrama);
  console.log("HUHUHUHUHUH", dramaObj.trailer);
  const dramaArr = Object.values(dramaObj);

  useEffect(() => {
    dispatch(getSingleDramaThunk(dramaId));

    setIsLoaded(true);
  }, [dispatch, dramaId]);

  if (submitted) {
    dispatch(getSingleDramaThunk(dramaObj.id));
    setSubmitted(false);
  }

  if (!dramaObj) {
    return <Redirect to="/" />;
  }

  if (!dramaObj.trailer) {
    return (
      <div className="entire-single-drama">
        <div className="single-drama-body">
          <img className="single-drama-img" src={dramaObj.drama_image} />
          <div className="single-drama-info">
            <div className="single-drama-rating">**Rating**</div>
            <h1 className="single-drama-title">{dramaObj.drama_name}</h1>
            <div className="single-drama-desc">{dramaObj.description}</div>
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
        <img className="single-drama-img" src={dramaObj.drama_image} />
        <div className="single-drama-info">
          <div className="single-drama-rating">**Rating**</div>
          <h1 className="single-drama-title">{dramaObj.drama_name}</h1>
          <div className="single-drama-desc">{dramaObj.description}</div>
          <div className="single-drama-genre">Genre: {dramaObj.genre}</div>
        </div>
      </div>
      <div className="single-drama-review-trailer">
        <div className="single-drama-reviews">No reviews yet!</div>
        <div className="single-drama-trailer">
          {videoId && (
            <iframe
              className="single-drama-video"
              width="640"
              height="360"
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allowFullScreen
              title="YouTube Video"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleDramaPage;
