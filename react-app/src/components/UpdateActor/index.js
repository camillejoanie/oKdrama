import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { updateActorThunk, getSingleActorThunk } from "../../store/actor";
import "./UpdateActor.css";

function UpdateActor({ submitted }) {
  const dispatch = useDispatch();
  const { actorId } = useParams();
  const actorObj = useSelector((state) => state.actors.singleActor);
  const userId = useSelector((state) => state.session.user.id);

  const [actorName, setActorName] = useState(actorObj.actor_name || "");
  const [debutYear, setDebutYear] = useState(actorObj.debut_year || "");
  const [bio, setBio] = useState(actorObj.bio || "");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getSingleActorThunk(actorId));
  }, [dispatch, actorId]);

  useEffect(() => {
    setActorName(actorObj.actor_name || "");
    setDebutYear(actorObj.debut_year || "");
    setBio(actorObj.bio || "");
  }, [actorObj]);

  function errorsChecked(actorName, debutYear, bio) {
    const errors = {};
    if (!actorName) errors.actorName = "Actor name is required";
    if (!debutYear) errors.debutYear = "Debut year is required";
    if (debutYear.length !== 4)
      errors.debutYear = "Debut year must be 4 integers long";
    if (bio.length < 6) errors.bio = "Bio must be at least 6 characters";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const errorsFound = errorsChecked(actorName, debutYear, bio);

    const updatedActor = {
      user_id: userId,
      id: actorId,
      actor_name: actorName,
      actor_image: actorObj.actor_image,
      debut_year: debutYear,
      bio: bio,
    };

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(updateActorThunk(updatedActor));

      if (response) {
        submitted();
        dispatch(getSingleActorThunk(actorId));
      }
    }
  };

  if (!actorObj.id) return null;

  return (
    <div className="entire-update-actor">
      <div className="update-background">
        <h1 className="update-actor-header">Update your Actor information!</h1>
        <div className="update-actor-form-container">
          <form className="update-actor-form" onSubmit={handleSubmit}>
            <div className="update-actor-title">
              <label className="update-actor-label">
                What is the name of your Actor?
              </label>
              <input
                type="text"
                value={actorName}
                onChange={(e) => setActorName(e.target.value)}
                placeholder="Actor Name"
              />
              {hasSubmitted && errors.actorName && (
                <p className="update-actor-errors">{errors.actorName}</p>
              )}
            </div>
            <div className="update-actor-debutyear">
              <label className="update-actor-label">
                What year did the actor debut?
              </label>
              <input
                type="number"
                value={debutYear}
                onChange={(e) => setDebutYear(e.target.value)}
                placeholder="Debut Year"
              />
              {hasSubmitted && errors.debutYear && (
                <p className="update-actor-errors">{errors.debutYear}</p>
              )}
            </div>
            <div className="update-actor-bio">
              <label className="update-actor-label">
                Please provide a small biography of the actor.
              </label>
              <textarea
                type="textarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
              />
              {hasSubmitted && errors.bio && (
                <p className="update-actor-errors">{errors.bio}</p>
              )}
            </div>
            <div className="update-actor-submit">
              <button type="submit" className="update-actor-button">
                Update your Actor!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateActor;
