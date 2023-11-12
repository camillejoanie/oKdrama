import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createActorThunk } from "../../store/actor";
import "./CreateActor.css";

function CreateActorForm({ reload }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);

  const [actorName, setActorName] = useState("");
  const [debutYear, setDebutYear] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState({});

  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  function errorsChecked(actorName, debutYear, bio, image) {
    const errors = {};

    if (!actorName) errors.actorName = "Actor name is required";
    if (actorName.length > 40)
      errors.actorName = "Actor name cannot be more than 40 characters long";
    if (!image) errors.image = "Actor image is required";
    if (!debutYear) errors.debutYear = "Debut year is required";
    if (debutYear.length !== 4)
      errors.debutYear = "Debut year must be 4 integers long";
    if (bio.length < 6)
      errors.bio = "Actor bio must be at least 6 characters long";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsFound = errorsChecked(actorName, debutYear, bio, image);

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("actor_name", actorName);
    formData.append("debut_year", debutYear);
    formData.append("actor_image", image);
    formData.append("bio", bio);

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(createActorThunk(formData));
      setImageLoading(true);

      if (response) {
        reload();
        history.push(`/actors/${response.id}`);
      }
    }
  };

  return (
    <div className="entire-create-actor">
      <div className="create-background">
        <h1 className="create-actor-header">Add your Actor!</h1>
        <div className="create-actor-form-container">
          <form
            className="create-actor-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="create-actor-title">
              <label className="create-actor-label">
                What is the name of your Actor?
              </label>
              <input
                type="text"
                value={actorName}
                onChange={(e) => setActorName(e.target.value)}
                placeholder="Actor Name"
              />
              {errors.actorName && (
                <p className="create-actor-errors">{errors.actorName}</p>
              )}
            </div>
            <div className="create-actor-img">
              <label className="create-actor-label">
                Upload a picture of your Actor:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {errors.image && (
                <p className="create-actor-errors">{errors.image}</p>
              )}
              {imageLoading && <p>Loading...</p>}
            </div>
            <div className="create-actor-debutyear">
              <label className="create-actor-label">
                What year did the actor debut?
              </label>
              <input
                type="number"
                value={debutYear}
                onChange={(e) => setDebutYear(e.target.value)}
                placeholder="Debut Year"
              />
              {errors.debutYear && (
                <p className="create-actor-errors">{errors.debutYear}</p>
              )}
            </div>
            <div className="create-actor-bio">
              <label className="create-actor-label">
                Please provide a small biography of the actor.
              </label>
              <textarea
                type="textarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
              />
              {errors.bio && (
                <p className="create-actor-errors">{errors.bio}</p>
              )}
            </div>
            <div className="create-actor-submit">
              <button type="submit" className="create-actor-button">
                Create your Actor!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateActorForm;
