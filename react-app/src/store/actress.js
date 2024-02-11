//ACTION TYPE
const GET_ACTRESSES = "actresses/GET_ACTRESSES";
const GET_SINGLE_ACTRESS = "actresses/GET_SINGLE_ACTRESS";
const CREATE_ACTRESS = "actresses/CREATE_ACTRESS";
const UPDATE_ACTRESS = "actresses/UPDATE_ACTRESS";
const DELETE_ACTRESS = "actresses/DELETE_ACTRESS";

//ACTION CREATORS
const loadAllActresses = (actresses) => ({
  type: GET_ACTRESSES,
  actresses,
});

const loadSingleActress = (actress) => ({
  type: GET_SINGLE_ACTRESS,
  actress,
});

const createActress = (actress) => ({
  type: CREATE_ACTRESS,
  actress,
});

const updateActress = (actress) => ({
  type: UPDATE_ACTRESS,
  actress,
});

const deleteActress = (actressId) => ({
  type: DELETE_ACTRESS,
  actressId,
});

//THUNKS
export const getActressesThunk = () => async (dispatch) => {
  const response = await fetch("/api/actresses/");

  if (response.ok) {
    const actress = await response.json();
    dispatch(loadAllActresses(actress));
    return actress;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const getSingleActressThunk = (actressId) => async (dispatch) => {
  const response = await fetch(`/api/actresses/${actressId}`);

  if (response.ok) {
    const actress = await response.json();
    dispatch(loadSingleActress(actress));
    return actress;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createActressThunk = (actress) => async (dispatch) => {
  const response = await fetch(`/api/actresses/create_actress`, {
    method: "POST",
    // headers: { "Content-Type": "application/json" },
    body: actress,
  });

  if (response.ok) {
    const newActress = await response.json();
    dispatch(createActress(newActress));
    return newActress;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const updateActressThunk = (actress) => async (dispatch) => {
  const response = await fetch(`/api/actresses/${actress.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(actress),
  });

  if (response.ok) {
    const updatedActress = await response.json();
    dispatch(updateActress(updatedActress));
    return updatedActress;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const deleteActressThunk = (actressId) => async (dispatch) => {
  const response = await fetch(`/api/actresses/${actressId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteActress(actressId));
  } else {
    const errors = await response.json();
    return errors;
  }
};

//REDUCER
const initialState = {
  allActresses: {},
  singleActress: {},
};

const actressesReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ACTRESSES:
      newState = { ...state };
      newState.allActresses = action.actresses;
      return newState;
    case GET_SINGLE_ACTRESS:
      newState = { ...state };
      newState.singleActress = action.actress;
      return newState;
    case CREATE_ACTRESS:
      newState = { ...state };
      newState.allActresses[action.actress.id] = action.actress;
      return newState;
    case UPDATE_ACTRESS:
      newState = { ...state };
      newState.singleActress = action.actress;
      return newState;
    case DELETE_ACTRESS:
      newState = { ...state };
      delete newState.allActresses[action.actressId];
      delete newState.singleActress;
      return newState;
    default:
      return state;
  }
};

export default actressesReducer;
