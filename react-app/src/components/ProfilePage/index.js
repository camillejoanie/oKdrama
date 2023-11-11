import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteDramaModal from "../DeleteDramaModal";
import DeleteActorModal from "../DeleteActorModal";
import { getDramasThunk } from "../../store/drama";
import { getActorsThunk } from "../../store/actor";
import "./ProfilePage.css";

function ProfilePage({ reload }) {
  const dispatch = useDispatch();
  const { dramaId } = useParams();
  const user = useSelector((state) => state.session.user);
  const allDramasObj = useSelector((state) => state.dramas.allDramas);
  const allActorsObj = useSelector((state) => state.actors.allActors);
  const [submitted, setSubmitted] = useState(false);
  const [reloaded, setReloaded] = useState(reload);

  const dramasArr = Object.values(allDramasObj);
  const actorsArr = Object.values(allActorsObj);

  const [currDrama, setCurrDrama] = useState(true);
  const [currActor, setCurrActor] = useState(false);
  //add likes and reviews later

  useEffect(() => {
    dispatch(getDramasThunk());
    dispatch(getActorsThunk());
  }, [dispatch]);

  if (!dramasArr || !dramasArr.length) {
    dispatch(getDramasThunk());
    return null;
  }

  if (!actorsArr || !actorsArr.length) {
    dispatch(getActorsThunk());
    return null;
  }

  if (reloaded) {
    dispatch(getDramasThunk());
    dispatch(getActorsThunk());
    setReloaded(false);
  }

  if (submitted) {
    dispatch(getDramasThunk());
    dispatch(getActorsThunk());
    setSubmitted(false);
  }

  const userDramasArr = user
    ? dramasArr.filter((drama) => drama.user_id === user.id)
    : [];

  const userActorsArr = user
    ? actorsArr.filter((actor) => actor.user_id === user.id)
    : [];
  console.log("AHHHHHHH", userActorsArr);

  return (
    <div className="entire-profile-page">
      <h1 className="profile-page-header">
        Hi, {user.first_name} {user.last_name}
      </h1>
      <div className="profile-main-container">
        <div className="profile-left-navs">
          <button
            className={`your-dramas ${currDrama ? "active" : ""}`}
            onClick={() => {
              setCurrDrama(true);
              setCurrActor(false);
            }}
          >
            Your Dramas
          </button>
          <button
            className={`your-actors ${currActor ? "active" : ""}`}
            onClick={() => {
              setCurrDrama(false);
              setCurrActor(true);
            }}
          >
            Your Actors
          </button>
        </div>
        <div className="profile-drama-content">
          {currDrama ? (
            <div className="user-dramas-container">
              {userDramasArr.length > 0 ? (
                userDramasArr.map((drama) => {
                  return (
                    <div key={drama.id} className="user-dramas">
                      {" "}
                      <div className="user-drama-info">
                        <NavLink
                          to={`/dramas/${drama.id}`}
                          className="profile-page-navlink"
                        >
                          <img
                            className="user-drama-img"
                            src={drama.drama_image}
                          />
                          <div className="user-drama-name">
                            {drama.drama_name}
                          </div>
                        </NavLink>
                        <div className="user-drama-buttons">
                          <NavLink
                            to={`/dramas/${drama.id}/update`}
                            className="update-drama-navlink"
                          >
                            Update
                          </NavLink>
                          <div className="user-delete-button">
                            <OpenModalButton
                              className="delete-drama-button"
                              buttonText="Delete"
                              modalComponent={
                                <DeleteDramaModal
                                  submitted={() => setSubmitted(true)}
                                  dramaId={drama.id}
                                />
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="profile-page-no-dramas">
                  No dramas yet! You should post one! 😉
                </p>
              )}
            </div>
          ) : currActor ? (
            <div className="user-actors-container">
              {userActorsArr.length > 0 ? (
                userActorsArr.map((actor) => {
                  return (
                    <div key={actor.id} className="user-actors">
                      <div className="user-actor-info">
                        <NavLink
                          to={`/actors/${actor.id}`}
                          className="profile-page-navlink"
                        >
                          <img
                            className="user-actor-img"
                            src={actor.actor_image}
                          />
                          <div className="user-actor-name">
                            {actor.actor_name}
                          </div>
                        </NavLink>
                        <div className="user-actor-buttons">
                          <NavLink
                            to={`/actors/${actor.id}/update`}
                            className="update-actor-navlink"
                          >
                            Update
                          </NavLink>
                          <div className="user-delete-button">
                            <OpenModalButton
                              className="delete-actor-button"
                              buttonText="Delete"
                              modalComponent={
                                <DeleteActorModal
                                  submitted={() => setSubmitted(true)}
                                  actorId={actor.id}
                                />
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="profile-page-no-actors">
                  No actors yet! You should post one! 😉
                </p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
