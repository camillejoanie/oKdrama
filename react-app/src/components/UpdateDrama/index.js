import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateDramaThunk, getSingleDramaThunk } from "../../store/drama";
import "./UpdateDrama.css";

function UpdateDrama({ dramaId, submitted }) {
  const dispatch = useDispatch();
  // const history = useHistory();
  const drama = useSelector((state) => state.dramas.singleDrama);
  console.log("HUHHHHHHHH", drama);
  const userId = useSelector((state) => state.session.user.id);

  const [dramaName, setDramaName] = useState(drama.drama_name);
  const [releaseDate, setReleaseDate] = useState(drama.release_date);
  const [genre, setGenre] = useState(drama.genre);
  const [description, setDescription] = useState(drama.description);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getSingleDramaThunk(dramaId));
  }, [dispatch, dramaId]);

  useEffect(() => {
    setDramaName(drama.drama_name || "");
    setReleaseDate(drama.release_date || "");
    setGenre(drama.genre || "");
    setDescription(drama.description || "");
  }, [drama]);

  function errorsChecked(dramaName, releaseDate, genre, description) {
    const errors = {};
    if (!dramaName) errors.dramaName = "Drama name is required";
    if (!releaseDate) errors.releaseDate = "Release Date is required";
    if (!genre) errors.genre = "Genre is required";
    if (!description) errors.description = "Description is required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const errorsFound = errorsChecked(
      dramaName,
      releaseDate,
      genre,
      description
    );

    const updatedDrama = {
      user_id: userId,
      id: dramaId,
      drama_name: dramaName,
      release_date: releaseDate,
      genre: genre,
      description: description,
    };

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(updateDramaThunk(updatedDrama));

      if (response) {
        submitted();
        // history.push(`/dramas/${response.id}`);
      }
    }
  };

  return (
    <div className="entire-update-dramas">
      <div className="update-background">
        <div className="update-drama-header">Update your K-Drama Post!</div>
        <div className="update-drama-form-container">
          <form className="update-drama-form" onSubmit={handleSubmit}>
            <div className="update-drama-form-fields">
              <label className="update-drama-label">
                What is the name of your K-Drama?
                <div className="update-drama-title">
                  <input
                    type="text"
                    value={dramaName}
                    onChange={(e) => setDramaName(e.target.value)}
                    placeholder="Drama Name"
                  />
                </div>
              </label>
              {hasSubmitted && errors.dramaName && (
                <p className="errors">{errors.dramaName}</p>
              )}
            </div>
            <div className="update-drama-form-fields">
              <label className="update-drama-label">
                When was the K-Drama released?
                <div className="update-drama-releasedate">
                  <input
                    type="date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                  />
                </div>
              </label>
              {hasSubmitted && errors.releaseDate && (
                <p className="errors">{errors.releaseDate}</p>
              )}
            </div>
            <div className="update-drama-form-fields">
              <label className="update-drama-label">
                What is the genre of the K-Drama?
                <div className="update-drama-genre">
                  <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="Genre"
                  />
                </div>
              </label>
              {hasSubmitted && errors.genre && (
                <p className="errors">{errors.genre}</p>
              )}
            </div>
            <div className="update-drama-form-fields">
              <label className="update-drama-label">
                Please provide a brief synopsis of the drama. (No Spoilers!)
                <textarea
                  type="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
              </label>
              {hasSubmitted && errors.description && (
                <p className="errors">{errors.description}</p>
              )}
            </div>
            <div className="update-drama-button-container">
              <button type="submit" className="update-drama-button">
                Update your K-Drama!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateDrama;
