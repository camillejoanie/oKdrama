//ACTION TYPE
const GET_DRAMAS = "dramas/GET_DRAMAS";
const GET_SINGLE_DRAMA = "dramas/GET_SINGLE_DRAMA";
const CREATE_DRAMA = "dramas/CREATE_DRAMA";
const UPDATE_DRAMA = "dramas/UPDATE_DRAMA";
const DELETE_DRAMA = "dramas/DELETE_DRAMA";
const GET_DRAMA_ACTORS = "dramas/GET_DRAMA_ACTORS";
const ADD_ACTOR_TO_DRAMA = "dramas/ADD_ACTOR_TO_DRAMA";

//ACTION CREATORS
const loadAllDramas = (dramas) => ({
  type: GET_DRAMAS,
  dramas,
});

const loadSingleDrama = (drama) => ({
  type: GET_SINGLE_DRAMA,
  drama,
});

const createDrama = (drama) => ({
  type: CREATE_DRAMA,
  drama,
});

const updateDrama = (drama) => ({
  type: UPDATE_DRAMA,
  drama,
});

const deleteDrama = (dramaId) => ({
  type: DELETE_DRAMA,
  dramaId,
});

const getDramaActors = (actors) => ({
  type: GET_DRAMA_ACTORS,
  actors,
});

const addActorToDrama = (dramaId, actorId) => ({
  type: ADD_ACTOR_TO_DRAMA,
  dramaId,
  actorId,
});

//THUNKS
export const getDramasThunk = () => async (dispatch) => {
  const response = await fetch("/api/dramas");

  if (response.ok) {
    const dramas = await response.json();
    dispatch(loadAllDramas(dramas));
    return dramas;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const getSingleDramaThunk = (dramaId) => async (dispatch) => {
  const response = await fetch(`/api/dramas/${dramaId}`);

  if (response.ok) {
    const drama = await response.json();
    dispatch(loadSingleDrama(drama));
    return drama;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createDramaThunk = (drama) => async (dispatch) => {
  const response = await fetch(`/api/dramas/create_drama`, {
    method: "POST",
    // headers: { "Content-Type": "application/json" },
    body: drama,
  });

  if (response.ok) {
    const newDrama = await response.json();
    dispatch(createDrama(newDrama));
    return newDrama;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const updateDramaThunk = (drama) => async (dispatch) => {
  const response = await fetch(`/api/dramas/${drama.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(drama),
  });

  if (response.ok) {
    const updatedDrama = await response.json();
    dispatch(updateDrama(updatedDrama));
    return updatedDrama;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const deleteDramaThunk = (dramaId) => async (dispatch) => {
  const response = await fetch(`/api/dramas/${dramaId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteDrama(dramaId));
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const getDramaActorsThunk = (dramaId) => async (dispatch) => {
  const response = await fetch(`/api/dramas/${dramaId}/get-actors`);

  if (response.ok) {
    const actors = await response.json();
    dispatch(getDramaActors(actors));
  }
};

export const addActorToDramaThunk = (payload) => async (dispatch) => {
  const response = await fetch(`/api/dramas/${payload.drama_id}/add-actor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const addedActor = await response.json();
    dispatch(addActorToDrama(addedActor));
  } else {
    const errors = await response.json();
    return errors;
  }
};

//REDUCER
const initialState = {
  allDramas: {},
  singleDrama: {},
  dramaActors: {},
};

const dramasReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_DRAMAS:
      newState = { ...state };
      newState.allDramas = action.dramas;
      return newState;
    case GET_SINGLE_DRAMA:
      newState = { ...state };
      newState.singleDrama = action.drama;
      return newState;
    case CREATE_DRAMA:
      newState = { ...state };
      newState.allDramas[action.drama.id] = action.drama;
      return newState;
    case UPDATE_DRAMA:
      newState = { ...state };
      newState.singleDrama = action.drama;
      return newState;
    case DELETE_DRAMA:
      newState = { ...state };
      delete newState.allDramas[action.dramaId];
      delete newState.singleDrama;
      return newState;
    case GET_DRAMA_ACTORS:
      newState = { ...state };
      newState.dramaActors = action.actors;
      return newState;
    case ADD_ACTOR_TO_DRAMA:
      newState = { ...state };
      const { dramaId, actorId } = action;
      if (newState.allDramas[dramaId]) {
        newState.allDramas[dramaId].actors.push(actorId);
      }
      return newState;
    default:
      return state;
  }
};

export default dramasReducer;
