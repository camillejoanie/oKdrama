import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getActorsThunk } from "../../store/actor";
import "./ActorPage.css";

function ActorPage() {
  const dispatch = useDispatch();
  const allActorsObj = useSelector((state) => state.actors.allActors);
  const sessionUser = useSelector((state) => state.session.user);
  const actorsArr = Object.values(allActorsObj);

  if (!actorsArr || !actorsArr.length) {
    dispatch(getActorsThunk());
    return null;
  }

  return (
    <div className="full-actor-page">
      <div className="top-actor-page">
        <div className="holding-space">{"  "}</div>
        <h1 className="actor-page-header">All Actors</h1>
        {sessionUser ? (
          <NavLink className="actor-page-create" to="/actors/create">
            Post your Actor
          </NavLink>
        ) : (
          <div className="actor-page-nocreate"></div>
        )}
      </div>
      <div className="each-actor-card">
        {actorsArr.map((actor) => (
          <NavLink className="actor-card-navlink" to={`/actors/${actor.id}`}>
            <div className="actor-card">
              <img className="actor-card-img" src={actor.actor_image} />
              <div className="actor-card-info">
                <div className="actor-card-name">{actor.actor_name}</div>
                <div className="actor-card-likes">{actor.likes}</div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default ActorPage;
