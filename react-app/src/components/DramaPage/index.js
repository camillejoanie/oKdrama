import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getDramasThunk } from "../../store/drama";
import "./DramaPage.css";

function calculateAverageRating(dramaId, reviews) {
  const filteredReviews = reviews.filter(
    (review) => review.drama_id === dramaId
  );

  if (filteredReviews.length === 0) return 0;

  const totalRating = filteredReviews.reduce(
    (sum, review) => sum + review.hearts,
    0
  );
  const averageRating = totalRating / filteredReviews.length;

  return averageRating;
}

function DramaPage() {
  const dispatch = useDispatch();
  const allDramasObj = useSelector((state) => state.dramas.allDramas);
  const reviewObj = useSelector((state) => state.reviews.allReviews);
  const sessionUser = useSelector((state) => state.session.user);
  const dramasArr = Object.values(allDramasObj);
  const reviewArr = Object.values(reviewObj);

  if (!dramasArr || !dramasArr.length) {
    dispatch(getDramasThunk());
    return null;
  }

  const heartImage = process.env.PUBLIC_URL + "/images/fullheart.svg";

  // const averageRating = calculateAverageRating(reviewArr);

  return (
    <div className="full-drama-page">
      <div className="top-drama-page">
        <div className="drama-page-genre">Genre</div>
        <h1 className="drama-page-header">All Dramas</h1>
        {sessionUser ? (
          <NavLink className="drama-page-create" to="/dramas/create">
            Post your Drama
          </NavLink>
        ) : (
          <div className="drama-page-no-create"></div>
        )}
      </div>
      <div className="each-drama-card">
        {dramasArr.map((drama) => (
          <NavLink className="drama-card-navlink" to={`/dramas/${drama.id}`}>
            <div className="drama-card">
              <img className="drama-card-img" src={drama.drama_image} />
              <div className="drama-card-info">
                <div className="drama-card-title">{drama.drama_name}</div>
                {/* <div className="drama-card-rating">
                  <img className="drama-card-heart" src={heartImage} />
                  <div className="drama-card-rating-num">
                    {reviewArr.length === 0
                      ? "New"
                      : calculateAverageRating(drama.id, reviewArr).toFixed(1)}
                  </div>
                </div> */}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default DramaPage;
