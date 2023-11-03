import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteDramaThunk } from "../../store/drama";
import { useModal } from "../../context/Modal";
import "./DeleteDrama.css";

function DeleteDramaModal({ dramaId, submitted }) {
  const dispatch = useDispatch();
  const [exist, setExist] = useState(true);
  const { closeModal } = useModal();

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(deleteDramaThunk(dramaId)).then(closeModal);
    submitted();
    setExist(false);
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <div className="entire-delete-drama">
      {exist && (
        <div className="delete-drama-modal">
          <button className="close-button" onClick={handleClose}>
            X
          </button>
          <h2 className="delete-drama-header">Confirm Delete</h2>
          <div className="delete-drama-rusure">
            Are you sure you want to remove this Playlist?
          </div>
          <button className="yes-delete-drama" onClick={confirmDelete}>
            Yes (Delete Drama)
          </button>
          <button className="no-delete-drama" onClick={cancelDelete}>
            No (Keep Drama)
          </button>
        </div>
      )}
    </div>
  );
}

export default DeleteDramaModal;
