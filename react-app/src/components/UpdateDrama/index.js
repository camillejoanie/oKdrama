import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateDramaThunk, getSingleDramaThunk } from "../../store/drama";
import "./UpdateDrama.css";

function UpdateDrama({ submitted }) {
  const dispatch = useDispatch();
  const { dramaId } = useParams();
  // const history = useHistory();
  const dramaObj = useSelector((state) => state.dramas.singleDrama);
  const userId = useSelector((state) => state.session.user.id);

  const [dramaName, setDramaName] = useState(dramaObj.drama_name || "");
  const [releaseYear, setReleaseYear] = useState(dramaObj.release_year || "");
  const [genre, setGenre] = useState(dramaObj.genre || "");
  const [description, setDescription] = useState(dramaObj.description || "");
  // const [dramaImage, setDramaImage] = useState(dramaObj.drama_image || "");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getSingleDramaThunk(dramaId));
  }, [dispatch, dramaId]);

  useEffect(() => {
    setDramaName(dramaObj.drama_name || "");
    setReleaseYear(dramaObj.release_year || "");
    setGenre(dramaObj.genre || "");
    setDescription(dramaObj.description || "");
    // setDramaImage(dramaObj.drama_image || "");
  }, [dramaObj]);

  function errorsChecked(
    dramaName,
    releaseYear,
    genre,
    // dramaImage,
    description
  ) {
    const errors = {};
    if (!dramaName) errors.dramaName = "Drama name is required";
    if (!releaseYear) errors.releaseYear = "Release Year is required";
    if (!genre) errors.genre = "Genre is required";
    // if (!dramaImage) errors.dramaImage = "Drama Image is required";
    if (!description) errors.description = "Description is required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const errorsFound = errorsChecked(
      dramaName,
      releaseYear,
      genre,
      description
      // dramaImage
    );

    console.log("WOWOWOWOWO", dramaObj.drama_image);

    const updatedDrama = {
      user_id: userId,
      id: dramaId,
      drama_name: dramaName,
      drama_image: dramaObj.drama_image,
      release_year: releaseYear,
      genre: genre,
      description: description,
    };

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(updateDramaThunk(updatedDrama));

      if (response) {
        submitted();
        dispatch(getSingleDramaThunk(dramaId));
        // history.push(`/dramas/${response.id}`);
      }
    }
  };

  if (!dramaObj.id) return null;

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
                What year was the K-Drama released?
                <div className="update-drama-releaseyear">
                  <input
                    type="number"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(e.target.value)}
                    placeholder="Release Year"
                  />
                </div>
              </label>
              {hasSubmitted && errors.releaseYear && (
                <p className="errors">{errors.releaseYear}</p>
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
