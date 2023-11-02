//ACTION TYPE
const GET_ACTORS = "actors/GET_ACTORS";
const GET_SINGLE_ACTOR = "actors/GET_SINGLE_ACTOR";
const CREATE_ACTOR = "actors/CREATE_ACTOR";
const UPDATE_ACTOR = "actors/UPDATE_ACTOR";
const DELETE_ACTOR = "actors/DELETE_ACTOR";

//ACTION CREATORS
const loadAllActors = (actors) => ({
  type: GET_ACTORS,
  actors,
});

const loadSingleActor = (actor) => ({
  type: GET_SINGLE_ACTOR,
  actor,
});

const createActor = (actor) => ({
  type: CREATE_ACTOR,
  actor,
});

const updateActor = (actor) => ({
  type: UPDATE_ACTOR,
  actor,
});

const deleteActor = (actorId) => ({
  type: DELETE_ACTOR,
  actorId,
});

//THUNKS
export const getActorsThunk = () => async (dispatch) => {
  const response = await fetch("/api/actors/");

  if (response.ok) {
    const actor = await response.json();
    dispatch(loadAllActors(actor));
    return actor;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const getSingleActorThunk = (actorId) => async (dispatch) => {
  const response = await fetch(`/api/actors/${actorId}`);

  if (response.ok) {
    const actor = await response.json();
    dispatch(loadSingleActor(actor));
    return actor;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createActorThunk = (actor) => async (dispatch) => {
  const response = await fetch(`/api/actors/create_actor`, {
    method: "POST",
    // headers: { "Content-Type": "application/json" },
    body: actor,
  });

  if (response.ok) {
    const newActor = await response.json();
    dispatch(createActor(newActor));
    return newActor;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const updateActorThunk = (actor) => async (dispatch) => {
  const response = await fetch(`/api/actors/${actor.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(actor),
  });

  if (response.ok) {
    const updatedActor = await response.json();
    dispatch(updateActor(updatedActor));
    return updatedActor;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const deleteActorThunk = (actorId) => async (dispatch) => {
  const response = await fetch(`/api/actors/${actorId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteActor(actorId));
  } else {
    const errors = await response.json();
    return errors;
  }
};

//REDUCER
const initialState = {
  allActors: {},
  singleActor: {},
};

const actorsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ACTORS:
      newState = { ...state };
      newState.allActors = action.actors;
      return newState;
    case GET_SINGLE_ACTOR:
      newState = { ...state };
      newState.singleActor = action.actor;
      return newState;
    case CREATE_ACTOR:
      newState = { ...state };
      newState.allActors[action.actor.id] = action.actor;
      return newState;
    case UPDATE_ACTOR:
      newState = { ...state };
      newState.singleActor = action.actor;
      return newState;
    case DELETE_ACTOR:
      newState = { ...state };
      delete newState.allActors[action.actorId];
      delete newState.singleActor;
      return newState;
    default:
      return state;
  }
};

export default actorsReducer;
