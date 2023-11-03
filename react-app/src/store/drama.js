//ACTION TYPE
const GET_DRAMAS = "dramas/GET_DRAMAS";
const GET_SINGLE_DRAMA = "dramas/GET_SINGLE_DRAMA";
const CREATE_DRAMA = "dramas/CREATE_DRAMA";
const UPDATE_DRAMA = "dramas/UPDATE_DRAMA";
const DELETE_DRAMA = "dramas/DELETE_DRAMA";

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
  const response = await fetch(`/api/dramas/create`, {
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
  const response = await fetch(`/api/dramas/${drama.id}/update`, {
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

//REDUCER
const initialState = {
  allDramas: {},
  singleDrama: {},
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
    default:
      return state;
  }
};

export default dramasReducer;
