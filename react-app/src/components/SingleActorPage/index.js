import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { getSingleActorThunk } from "../../store/actor";
import "./SingleActor.css";

function SingleActorPage() {
  const dispatch = useDispatch();
  const { actorId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const actorObj = useSelector((state) => state.actors.singleActor);
  const actorArr = Object.values(actorObj);

  useEffect(() => {
    dispatch(getSingleActorThunk(actorId));

    setIsLoaded(true);
  }, [dispatch, actorId]);

  if (submitted) {
    dispatch(getSingleActorThunk(actorObj.id));
    setSubmitted(false);
  }

  if (!actorObj) {
    return <Redirect to="/" />;
  }

  return (
    <div className="entire-single-actor">
      <div className="single-actor-body">
        <img className="single-actor-img" src={actorObj.actor_image} />
        <div className="single-actor-info">
          {/* <div className="single-actor-likes">*likes*</div> */}
          <h1 className="single-actor-title">{actorObj.actor_name}</h1>
          <div className="single-actor-bio">{actorObj.bio}</div>
          <div className="single-actor-debut">
            Debuted: {actorObj.debut_year}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleActorPage;
