import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getDramasThunk } from "../../store/drama";
import "./DramaPage.css";

function DramaPage() {
  const dispatch = useDispatch();
  const allDramasObj = useSelector((state) => state.dramas.allDramas);
  const dramasArr = Object.values(allDramasObj);
  console.log("HAHAHAHAHAAH", allDramasObj);

  if (!dramasArr || !dramasArr.length) {
    dispatch(getDramasThunk());
    return null;
  }

  return (
    <div className="full-drama-page">
      <div className="top-drama-page">
        <div className="drama-page-genre">Genre</div>
        <h1 className="drama-page-header">All Dramas</h1>
        <NavLink className="drama-page-create" to="/dramas/create">
          Post your Drama
        </NavLink>
      </div>
      <div className="each-drama-card">
        {dramasArr.map((drama) => (
          <NavLink className="drama-card-navlink" to={`/dramas/${drama.id}`}>
            <div className="drama-card">
              <img className="drama-card-img" src={drama.drama_image} />
              <div className="drama-card-info">
                <div className="drama-card-title">{drama.drama_name}</div>
                <div className="drama-card-rating">{drama.rating}</div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default DramaPage;
