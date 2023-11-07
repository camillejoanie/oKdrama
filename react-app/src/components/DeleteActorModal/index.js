import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteActorThunk } from "../../store/actor";
import { useModal } from "../../context/Modal";
import "./DeleteActor.css";

function DeleteActorModal({ actorId, submitted }) {
  const dispatch = useDispatch();
  const [exist, setExist] = useState(true);
  const { closeModal } = useModal();
  const actor = useSelector((state) => state.actors.singleActor);

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(deleteActorThunk(actorId)).then(closeModal);
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

  const actorName =
    actor && actor[actorId] ? actor[actorId].actor_name : "Actor Not Found";

  return (
    <div className="entire-delete-actor">
      {exist && (
        <div className="delete-actor-modal">
          <button className="close-button" onClick={handleClose}>
            X
          </button>
          <h2 className="delete-actor-header">Confirm Delete</h2>
          <div className="delete-actor-rusure">
            {`Are you sure you want to delete ${actorName}?`}
          </div>
          <div className="delete-actor-buttons">
            <button className="yes-delete-actor" onClick={confirmDelete}>
              Yes (Delete Actor)
            </button>
            <button className="no-delete-actor" onClick={cancelDelete}>
              No (Keep Actor)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteActorModal;
