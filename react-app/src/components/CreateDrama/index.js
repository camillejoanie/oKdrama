import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createDramaThunk } from "../../store/drama";
import "./CreateDrama.css";

function CreateDramaForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  //   const userId = useSelector((state) => state.session.user.id);

  const [dramaName, setDramaName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const [image, setImage] = useState(null);
  const [trailer, setTrailer] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  function errorsChecked(dramaName, releaseDate, genre, image) {
    const errors = {};
    if (!dramaName) errors.dramaName = "Drama name is required";
    if (!releaseDate) errors.releaseDate = "Release Date is required";
    if (!genre) errors.genre = "Genre is required";
    if (!image) errors.image = "Drama image is required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsFound = errorsChecked(
      dramaName,
      releaseDate,
      genre,
      description,
      image,
      trailer
    );

    const formData = new FormData();
    formData.append("drama_name", dramaName);
    formData.append("release_date", releaseDate);
    formData.append("genre", genre);
    formData.append("description", description);
    formData.append("drama_image", image);
    formData.append("trailer", trailer);

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(createDramaThunk(formData));
      setImageLoading(true);

      if (response) {
        // reload();
        history.push(`/dramas/${response.id}`);
      }
    }
  };

  return (
    <div className="entire-create-drama">
      <div className="create-background">
        <div className="create-drama-header">Post your K-Drama!</div>
        <div className="create-drama-form-container">
          <form
            className="create-drama-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="create-drama-title">
              <label className="create-drama-label">
                What is the name of your K-Drama?
              </label>
              <input
                type="text"
                value={dramaName}
                onChange={(e) => setDramaName(e.target.value)}
                placeholder="Drama Name"
              />
              {errors.dramaName && (
                <p className="create-drama-errors">{errors.dramaName}</p>
              )}
            </div>
            <div className="create-drama-img">
              {" "}
              <label className="create-drama-label">
                Upload your Drama Poster Picture:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {errors.image && (
                <p className="create-drama-errors">{errors.image}</p>
              )}
              {imageLoading && <p>Loading...</p>}
            </div>
            <div className="create-drama-releasedate">
              <label className="create-drama-label">
                When was the K-Drama released?
              </label>
              <input
                type="date"
                name="Release Date"
                min="1999-10-06"
                max="2023-09-11"
                required
              />
            </div>
            <div className="create-drama-genre">
              <label className="create-drama-label">
                What is the genre of the K-Drama?
              </label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Genre"
              />
              {errors.genre && (
                <p className="create-drama-errors">{errors.genre}</p>
              )}
            </div>
            <div className="create-drama-trailer">
              <label className="create-drama-label">
                Add Trailer Link (if available):
              </label>
              <input
                type="url"
                value={trailer}
                onChange={(e) => setTrailer(e.target.value)}
                placeholder="Trailer URL"
              />
            </div>
            <div className="create-drama-desc">
              <label className="create-drama-label">
                Please provide a brief synopsis of the drama. (No Spoilers!)
              </label>
              <textarea
                type="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
              {errors.description && (
                <p className="create-drama-errors">{errors.description}</p>
              )}
            </div>
            <div className="create-drama-button-container">
              <button type="submit" className="create-drama-button">
                Post your K-Drama!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateDramaForm;
